import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cart } from '@module/orders/component/cart/cart';

@Component({
  selector: 'app-orders-view',
  imports: [Cart],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersView {

}
