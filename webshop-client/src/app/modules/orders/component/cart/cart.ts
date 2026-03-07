import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CartItem } from '@module/orders/order.interface';
import { ProductCard } from '@module/products/components/product-card/product-card';

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
  public defaultForm = this.fb.group({
    items: this.fb.array([]),
  });
  // can accept a parent component form if provided
  public $form = input(this.defaultForm);
  $items = input<CartItem[]>();
  deleteItemEvent = output<number>();
  quantityChangeEvent = output<{ productId: number; quantity: number }>();

  public $isReadonly = input(false);
  public selectNumbers = Array.from({ length: 99 }, (_, i) => i + 1);

  get itemsArr() {
    return (this.$form()?.get('items') as FormArray) ?? this.fb.array([]);
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

  addAndPatchItem(item: CartItem) {
    this.itemsArr?.push(
      this.fb.group({
        quantity: item.quantity,
        unitPrice: item.unitPrice,
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
    if (productId !== null && quantity !== null) {
      this.quantityChangeEvent.emit({ productId, quantity });
    }
  }
}
