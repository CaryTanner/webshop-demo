import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {
  CartItem,
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ShippingMethod,
} from '@module/orders/order.interface';
import { OrderService } from '@module/orders/service/order-service';
import { ProductCard } from '@module/products/components/product-card/product-card';
import { ProductsList } from '@module/products/components/products-list/products-list';
import { Product } from '@module/products/product.interface';

const mockProducts = [
  {
    id: 9,
    name: '0.1µF Bypass Capacitor',
    description: 'Decoupling capacitor for power lines',
    price: 2.0,
    stock: 400,
    svgType: 'Capacitor',
    categories: [
      {
        id: 2,
        name: 'Capacitors',
      },
      {
        id: 10,
        name: 'Passive Components',
      },
    ],
  },
  {
    id: 10,
    name: '1000µF Electrolytic Capacitor',
    description: 'Large smoothing capacitor 16V',
    price: 6.0,
    stock: 150,
    svgType: 'Capacitor',
    categories: [
      {
        id: 2,
        name: 'Capacitors',
      },
      {
        id: 10,
        name: 'Passive Components',
      },
    ],
  },
  {
    id: 11,
    name: '100µH Inductor',
    description: 'Small signal inductor',
    price: 5.0,
    stock: 200,
    svgType: 'Inductor',
    categories: [
      {
        id: 3,
        name: 'Inductors',
      },
      {
        id: 10,
        name: 'Passive Components',
      },
    ],
  },
] as Product[];

@Component({
  selector: 'app-cart',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ProductCard,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  fb = inject(FormBuilder);
  $items = input<CartItem[] | OrderItem[]>();
  deleteItemEvent = output<number>();
  quantityChangeEvent = output<{ productId: number; quantity: number }>();
  public form = this.fb.group({
    orderId: null,
    status: OrderStatus.Draft,
    userId: null,
    items: this.fb.array([]),
  });
  public selectNumbers = Array.from({ length: 100 }, (_, i) => i + 1);

  get itemsArr() {
    return (this.form?.get('items') as FormArray) ?? this.fb.array([]);
  }

  constructor() {
    effect(() => {
      const items = this.$items();
      // only trigger on initial load of items to prevent overwriting form
      // changes when $items signal updates from parent component
      if (!this.itemsArr?.controls?.length) {
        items?.forEach((item) => {
          this.addAndPatchItem(item);
        });
      }
    });
  }

  addAndPatchItem(item: CartItem | OrderItem) {
    this.itemsArr.push(
      this.fb.group({
        id: 'id' in item ? (item as OrderItem).id : null,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        orderId: 'orderId' in item ? (item as OrderItem).orderId : null,
        productId: item.productId,
        product: item.product,
      }),
    );
  }

  onDeleteItem(index: number, productId: number) {
    this.deleteItemEvent.emit(productId);
    this.itemsArr.removeAt(index);
  }

  onQuantityChange(event: MatSelectChange, idx: number) {
    const productId = this.itemsArr.at(idx).get('productId')?.value;
    const quantity = event.value;
    if (productId != null && quantity != null) {
      this.quantityChangeEvent.emit({ productId, quantity });
    }
  }
}
