import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgType, Product } from '@module/products/product.interface';

const mock_product = {
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
@Component({
  selector: 'app-product-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private $productId = signal(this.route.snapshot.paramMap.get('id'));
  public $viewMode = computed(() => {
    const id = this.$productId();
    if (!id) return 'create';
    return 'edit';
  });
  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.maxLength(500)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    svgType: ['Resistor', [Validators.required]],
    categories: [[1], [Validators.required]],
  });

  // Provide svgTypes and categories for the template
  svgTypes = [
    'Resistor',
    'Capacitor',
    'Inductor',
    'Led',
    'Transistor',
    'IcChip',
    'Microcontroller',
    'Connector',
    'Battery',
    'Sensor',
    'Display',
    'Semiconductor',
  ];

  //TODO fetch categories from backend instead of hardcoding

  categories = [
    // Example categories; replace with real data as needed
    { id: 1, name: 'Passive' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Electromechanical' },
  ];

  patchProductForm(product: Product) {
    this.form.patchValue({
      name: product.name ?? '',
      description: product.description ?? '',
      price: product.price ?? null,
      stock: product.stock ?? null,
      svgType: product.svgType ?? null,
      categories: Array.isArray(product.categories) ? product.categories.map((c) => c.id) : [],
    });
  }
}
