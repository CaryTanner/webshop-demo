import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cart } from '@module/orders/component/cart/cart';
import { ItemTotal } from '@module/orders/component/item-total/item-total';
import { OrderService } from '@module/orders/service/order-service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ROUTE_PATHS } from 'src/app/app.routes';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-view',
  imports: [Cart, MatIconModule, RouterModule, MatButtonModule, ItemTotal],
  templateUrl: './cart-view.html',
  styleUrl: './cart-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartView {
  public productsPath = ROUTE_PATHS.products['base'];
  public checkoutPath = ROUTE_PATHS.orders['checkout'];
  private orderService = inject(OrderService);
  public $cart = this.orderService.$cart;
  public $cartTotal = this.orderService.$cartTotal;
  public $numItemsInCart = this.orderService.$numberCartItems;

  onQuantityChange(event: { productId: number; quantity: number }) {
    this.orderService.updateItemQuantity(event.productId, event.quantity);
  }

  onDeleteItem(productId: number) {
    this.orderService.removeItem(productId);
  }
}
