import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '@module/products/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  $product = input.required<Product | null>();
  $isInCart = input<boolean>(false);
}
