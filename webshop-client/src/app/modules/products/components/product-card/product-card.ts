import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '@module/products/product.interface';
import { ROUTE_PATHS } from 'src/app/app.routes';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  public prodDetailsPath = ROUTE_PATHS.products['detailsBase'];
  $product = input.required<Product | undefined>();
  $isInCart = input<boolean>(false);
}
