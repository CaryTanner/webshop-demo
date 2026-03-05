import { Routes } from '@angular/router';
import { OrdersView } from './view/orders-view/orders-view';
import { authGuard } from '@common/guards/auth/auth-guard';
import { ordersRoutePaths } from 'src/app/app.routes';
import { CartView } from './view/cart-view/cart-view';
import { CheckoutView } from './view/checkout-view/checkout-view';

export const routes: Routes = [
  {
    path: ordersRoutePaths.base,
    component: OrdersView,
    children: [
      { path: '', pathMatch: 'full', redirectTo: ordersRoutePaths.cart },
      { path: ordersRoutePaths.cart, component: CartView },
      { path: ordersRoutePaths.checkout, component: CheckoutView, canActivate: [authGuard] },
    ],
  },
];
