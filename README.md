# Webshop demo

A full-stack webshop for electronics components built as a code test. The shop sells components such as resistors, capacitors, and microcontrollers. Products are illustrated with SVG icons grouped by component type.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21, Angular Material (MD3), Reactive Forms, Signals |
| Backend | .NET 8 Web API, EF Core Code First, SQLite |
| Auth | JWT (BCrypt password hashing) |
| Payments | Stripe (test mode) — card |
| API Docs | Swagger / OpenAPI |
| E2E Tests | Playwright |

---

## Features

- **Product catalogue** — search, filter by category, sort by name or price
- **Product detail** — component info, SVG illustration, add to cart
- **Shopping cart** — view, update quantities, remove items. Cart persists in localStorage keyed by user with expiry
- **Checkout** — multi-step flow: review items → shipping → payment. Requires login to complete
- **Authentication** — JWT login, admin role encoded in token
- **Admin** — create, edit, and delete products (admin users only)
- **Responsive** — desktop and mobile layouts

---


## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Angular CLI](https://angular.io/cli) — `npm install -g @angular/cli`
- [EF Core CLI tools](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) — `dotnet tool install --global dotnet-ef`

---

## Setup

### Backend

**1. Create your local secrets file**

Copy the template and fill in your own keys. This file is gitignored and should never be committed:

```bash
cp webshop.api/appsettings.json webshop.api/appsettings.Development.json
```

Edit `appsettings.Development.json` with your actual values:

```json
{
  "Jwt": {
    "Key": "your-secret-key-at-least-32-characters-long",
    "Issuer": "webshop.api"
  },
  "Stripe": {
    "SecretKey": "sk_test_yourStripeSecretKey",
    "PublishableKey": "pk_test_yourStripePublishableKey"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=webshop.db"
  }
}
```

> Stripe test keys are available in your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys). No real money is involved in test mode. 

> Stripe test credit card numbers [Stripe Docs](https://docs.stripe.com/testing?testing-method=card-numbers#visa). 

**2. Create and seed the database**

```bash
cd webshop.api
dotnet ef database update
```

This creates `webshop.db` and seeds it with:
- 10 categories
- 50 products across multiple categories
- 1 admin user (see credentials below) & 1 user


**3. Run the API**

```bash
dotnet run
```

The API will be available at `http://localhost:5055`.
Swagger UI is available at `http://localhost:5055/swagger`.

---

### Frontend

**1. Install dependencies**

```bash
cd webshop-client
npm install
```

**2. Install Playwright browser binaries** (required for e2e tests)

```bash
npx playwright install
```

**3. Run the app**

```bash
ng serve
```

The app will be available at `http://localhost:4200`.

---

## Seeded Users

Two users are created automatically when you run `dotnet ef database update`:

| Field | Value |
|---|---|
| Email | `admin@email.com` |
| Password | `admin123` |
| Email | `not.admin@email.com` |
| Password | `notAdmin123` |

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Login, returns JWT | Public |

### Products
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | List products (search, filter, sort) | Public |
| GET | `/api/products/{id}` | Get product by ID | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/{id}` | Update product | Admin |
| DELETE | `/api/products/{id}` | Delete product | Admin |

### Orders
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/orders` | List orders | User |
| GET | `/api/orders/{id}` | Get order | User |
| POST | `/api/orders` | Create draft order | User |
| PUT | `/api/orders/{id}` | Update order | User |
| DELETE | `/api/orders/{id}` | Delete order | User |

### Categories
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/categories` | List all categories | Public |

### Payments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/payments/create-payment-intent` | Create Stripe PaymentIntent | User |

---

## Frontend Routes

| Route | Description | Protected |
|---|---|---|
| `/products` | Product catalogue | No |
| `/products/:id` | Product detail | No |
| `/orders/cart` | Shopping cart | Yes Yes (login required) |
| `/orders/checkout` | Checkout flow | Yes (login required) |
| `/products/manage/**` | Admin product management | Yes (admin only) |
| `/login` | Login | No |
| `/home` | Hero | No |

---

## Cart Behaviour

- Cart is stored in `localStorage` keyed by user ID (or as a guest cart)
- Cart expires after 7 days of inactivity
- Draft orders are created in the database only when checkout ends
- Cart is cleared on successful order completion

---

## Checkout Flow

1. **Review items** — confirm cart contents
2. **Shipping** — enter delivery address and choose shipping method
3. **Payment** — pay via card using Stripe test mode

Each step must be valid before proceeding. Users can navigate backwards but must resubmit the step to move forward again.

**Stripe test card:** `4242 4242 4242 4242` — any future expiry, any CVC.

---

## Running E2E Tests

Make sure both the API (`http://localhost:5055`) and the Angular app (`http://localhost:4200`) are running, then:

```bash
cd webshop-client
npm run e2e

# With interactive UI
npm run e2e:ui
```

---

## Environment Notes

- `appsettings.Development.json` is gitignored 
- `appsettings.json` contains placeholder values and is safe to commit
- The `.NET` app automatically uses `appsettings.Development.json` when `ASPNETCORE_ENVIRONMENT=Development`, which is set by default in `launchSettings.json`