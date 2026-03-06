import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Cart } from '../cart/cart';
import { ItemTotal } from '../item-total/item-total';
import { CartItem, OrderItem } from '@module/orders/order.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ROUTE_PATHS } from 'src/app/app.routes';

@Component({
  selector: 'app-review-items',
  imports: [Cart, ItemTotal, ReactiveFormsModule, MatButtonModule, RouterModule],
  templateUrl: './review-items.html',
  styleUrl: './review-items.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewItems {
  $items = input.required<CartItem[] | OrderItem[]>();
  $form = input.required<FormGroup>();
  submitEmission = output<void>();
  public cartPath = ROUTE_PATHS.orders['cart'];
}
