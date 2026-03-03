import { Routes } from '@angular/router';
import { Home } from '@common/components/home/home';
import { NotFound } from '@common/components/not-found/not-found';
import { LoginRequired } from '@module/authentication/view/login-required/login-required';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'login',
    component: LoginRequired,
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.routes').then((m) => m.routes),
  },

  // Lazy loaded other routes
  {
    path: 'account',
    loadChildren: () =>
      import('./modules/authentication/authentication.routes').then((m) => m.routes),
  },

  {
    path: 'order',
    loadChildren: () => import('./modules/orders/orders.routes').then((m) => m.routes),
  },

  {
    path: '**',
    component: NotFound,
  },
];
