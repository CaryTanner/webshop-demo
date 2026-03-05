import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-item-total',
  imports: [],
  templateUrl: './item-total.html',
  styleUrl: './item-total.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemTotal {
  $total = input<number>(0);
  $tax = input<number>(0);
  $shipping = input<number | string>('free');
  $actionText = input<string>('Proceed to Checkout');
}
