import { CurrencyPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Product, SvgType } from '@module/products/product.interface';

@Component({
  selector: 'app-product-details-view',
  imports: [
    MatCardModule,
    MatChipsModule,
    CurrencyPipe,
    NgClass,
    MatDivider,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './product-details-view.html',
  styleUrl: './product-details-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsView {
  private route = inject(ActivatedRoute);
  private $productId = signal(this.route.snapshot.paramMap.get('id'));
  product = {
    id: 1,
    name: '1kΩ Resistor',
    description:
      'General purpose 1kΩ through-hole resistor. Perfect for breadboarding and prototyping.',
    price: 1.25,
    stock: 10,
    svgType: SvgType.Resistor,
    categories: [
      { id: 1, name: 'Resistors' },
      { id: 10, name: 'Passive Components' },
    ],
    orderItems: [],
  };

  addToCart(product: Product) {
    console.log('TODO-- return to products i missin id')
    console.log('Adding to cart:', product);
  }
}
