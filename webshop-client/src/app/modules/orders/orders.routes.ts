import { Routes } from '@angular/router';
import { OrdersView } from './view/orders-view/orders-view';
import { authGuard } from '@common/guards/auth/auth-guard';
import { ordersRoutePaths } from 'src/app/app.routes';

export const routes: Routes = [
  {
    path: ordersRoutePaths.base,
    component: OrdersView,
    canActivate: [authGuard],
  },
];
