import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '@module/products/product.interface';

@Component({
  selector: 'app-products-list',
  imports: [RouterModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsList {
  $products = input.required<Product[] | null>();
}
