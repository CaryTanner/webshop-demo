import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@module/orders/order.interface';
import { OrderService } from '@module/orders/service/order-service';
import { ItemTotal } from '../item-total/item-total';
import { ProductsList } from '@module/products/components/products-list/products-list';

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe, ItemTotal, ProductsList],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummary {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  public $orderId = signal(Number(this.route.snapshot.paramMap.get('id')));
  public $order: Signal<Order | undefined> = toSignal(this.orderService.getOrder(this.$orderId()));
  public $products = computed(() => {
    return this.$order()?.items.map((item) => item.product) || [];
  });
}
