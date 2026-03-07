import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { OrderService } from '@module/orders/service/order-service';

@Component({
  selector: 'app-item-total',
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './item-total.html',
  styleUrl: './item-total.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemTotal {
  private orderService = inject(OrderService);
  public $cartTotal = this.orderService.$cartTotal;
  public $orderTotal = input<number>(0);
  $tax = signal<number>(0);
  $shipping = signal<number | string>(0);
}
