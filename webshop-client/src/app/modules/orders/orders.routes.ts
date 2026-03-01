import { Routes } from '@angular/router';
import { OrdersView } from './view/orders-view/orders-view';

export const routes: Routes = [
  {
    path: 'order',
    component: OrdersView,
  },
];
