## Setup
Copy `appsettings.json` and create `appsettings.Development.json` with your own Stripe test keys.

Users
admin@email.com, admin123
not.admin@email.com, notAdmin123

markdown## Setup

### Prerequisites
- Node.js
- .NET 8 SDK
- Angular CLI

### Frontend
```bash
npm install
npx playwright install  # required for e2e tests
```

### Backend
Create `appsettings.Development.json` with your own keys (see `appsettings.json` for required fields):
```json
{
  "Stripe": {
    "SecretKey": "sk_test_yourKey",
    "PublishableKey": "pk_test_yourKey"
  },
  "Jwt": {
    "Key": "your-jwt-secret"
  }
}
```
```bash
dotnet ef database update  # creates and seeds the database
dotnet run
```

### Running e2e tests
Start dotnet server from ./webshop.api dotnet run
```bash
npm run e2e
```