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
    path: '',
    loadChildren: () => import('./modules/products/products.routes').then((m) => m.routes),
  },

  // Lazy loaded other routes
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication.routes').then((m) => m.routes),
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
