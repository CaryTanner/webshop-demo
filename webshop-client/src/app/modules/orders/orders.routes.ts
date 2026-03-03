import { Routes } from '@angular/router';
import { OrdersView } from './view/orders-view/orders-view';
import { authGuard } from '@common/guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: OrdersView,
    canActivate: [authGuard],
  },
];
