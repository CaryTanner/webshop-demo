import { Routes } from '@angular/router';
import { Home } from '@common/components/home/home';
import { NotFound } from '@common/components/not-found/not-found';
import { LoginRequired } from '@module/authentication/view/login-required/login-required';

// app routes
export const appRoutePaths = {
  home: 'home',
  login: 'login',
};

// account routes
const authBase = 'account';
export const authenticationRoutePaths = {
  base: authBase,
};

// products routes
const productsBase = 'products';
export const productsRoutePaths = {
  base: productsBase,
  create: `${productsBase}/manage/create`,
  editBase: `${productsBase}/manage/edit/`,
  detailsBase: `${productsBase}/details/`,
};

// orders routes
const ordersBase = 'orders';
export const ordersRoutePaths = {
  base: ordersBase,
  cart: 'cart',
  checkout: 'checkout',
  summary: 'summary',
};

// Route definitions use relative paths, but components need absolute paths.
const makeAbsolutePaths = (pathObject: Record<string, string>, basePath = '') => {
  const absolutePaths: Record<string, string> = {};
  Object.entries(pathObject).forEach(([key, value]) => {
    absolutePaths[key] = basePath === value ? `/${value}` : `/${basePath}/${value}`;
  });
  return absolutePaths;
};

export const ROUTE_PATHS = {
  app: makeAbsolutePaths(appRoutePaths),
  orders: makeAbsolutePaths(ordersRoutePaths, `${ordersBase}`),
  authentication: makeAbsolutePaths(authenticationRoutePaths),
  products: makeAbsolutePaths(productsRoutePaths),
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: appRoutePaths.home },
  {
    path: appRoutePaths.home,
    component: Home,
  },
  {
    path: appRoutePaths.login,
    component: LoginRequired,
  },
  // lazily loaded modules
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication.routes').then((m) => m.routes),
  },

  {
    path: '',
    loadChildren: () => import('./modules/products/products.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadChildren: () => import('./modules/orders/orders.routes').then((m) => m.routes),
  },

  {
    path: '**',
    component: NotFound,
  },
];
