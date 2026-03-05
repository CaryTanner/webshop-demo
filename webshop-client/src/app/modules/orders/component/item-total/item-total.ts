import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item-total',
  imports: [CurrencyPipe, MatButtonModule, DecimalPipe],
  templateUrl: './item-total.html',
  styleUrl: './item-total.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemTotal {
  $total = input<number>(0);
  $tax = input<number>(0);
  $shipping = input<number | string>('Free!');
  $actionText = input<string>('Proceed to Checkout');
  $actionDisabled = input<boolean>(false);
  $actionEmission = output<void>();
}
