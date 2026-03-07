import { CanActivateFn, Router, Routes } from '@angular/router';
import { OrdersView } from './view/orders-view/orders-view';
import { authGuard } from '@common/guards/auth/auth-guard';
import { ordersRoutePaths, ROUTE_PATHS } from 'src/app/app.routes';
import { CartView } from './view/cart-view/cart-view';
import { CheckoutView } from './view/checkout-view/checkout-view';
import { OrderService } from './service/order-service';
import { inject, Signal } from '@angular/core';
import { CartItem } from './order.interface';
import { OrderSummary } from '@module/orders/component/order-summary/order-summary';

const itemsGuard: CanActivateFn = () => {
  const $cart: Signal<CartItem[]> = inject(OrderService).$cart;
  if ($cart()?.length) {
    return true;
  }
  const router = inject(Router);

  return router.createUrlTree([ROUTE_PATHS.orders['base']]);
};

export const routes: Routes = [
  {
    path: ordersRoutePaths.base,
    component: OrdersView,
    children: [
      { path: '', pathMatch: 'full', redirectTo: ordersRoutePaths.cart },
      { path: ordersRoutePaths.cart, component: CartView },
      {
        path: ordersRoutePaths.checkout,
        component: CheckoutView,
        canActivate: [authGuard, itemsGuard],
      },
      { path: ordersRoutePaths.summary, component: OrderSummary, canActivate: [authGuard] },
    ],
  },
];
