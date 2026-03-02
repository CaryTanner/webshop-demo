import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '@module/products/product.interface';
import { ProductsService } from '@module/products/service/products-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, of, switchMap } from 'rxjs';
import { NotificationService } from '@common/services/notification/notification.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
    MatDialogModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  public deleteDialog = viewChild.required<TemplateRef<MatDialog>>('deleteConfirm');
  public matDialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  public $loading = signal(false);
  public $productId = signal(Number(this.route.snapshot.paramMap.get('id')));
  private productsService = inject(ProductsService);
  public $product = toSignal(
    of(this.$productId()).pipe(
      switchMap((id) => {
        if (!id) return of(null);
        return this.productsService.getProductById(id);
      }),
    ),
  );
  //TODO fetch categories/svg typesfrom backend instead of hardcoding

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

  categories = [
    // Example categories; replace with real data as needed
    { id: 1, name: 'Resistors' },
    { id: 2, name: 'Capacitors' },
    { id: 3, name: 'Inductors' },
    { id: 4, name: 'Semiconductors' },
    { id: 5, name: 'Microcontrollers' },
    { id: 6, name: 'Power' },
    { id: 7, name: 'Connectors' },
    { id: 8, name: 'Sensors' },
    { id: 9, name: 'Displays' },
    { id: 10, name: 'Passive Components' },
  ];
  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.maxLength(500)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    svgType: ['Resistor', [Validators.required]],
    categories: [[this.categories[0]], [Validators.required]],
  });

  constructor() {
    effect(() => {
      const product = this.$product();
      if (product?.id) {
        this.patchProductForm(product);
      }
    });
  }

  patchProductForm(product: Product) {
    let cats = [this.categories[0]];
    // must select objects from local categories list to for object reference equality in mat-select
    if (Array.isArray(product.categories) && product.categories?.length > 0) {
      cats = this.categories.filter((cat) => product.categories?.some((c) => c.id === cat.id));
    }
    this.form.patchValue({
      name: product.name ?? '',
      description: product.description ?? '',
      price: product.price ?? null,
      stock: product.stock ?? null,
      svgType: product.svgType ?? null,
      categories: cats,
    });
  }

  async createProduct() {
    this.$loading.set(true);
    try {
      const result = await firstValueFrom(
        this.productsService.createProduct({
          ...this.form.value,
        } as Product),
      );
      if (!result.id) return;
      this.notificationService.open('Product created successfully', 'success');

      this.router.navigate(['/products', 'edit', result.id]);
    } finally {
      this.$loading.set(false);
    }
  }

  async deleteProduct() {
    if (!this.$productId()) return;
    const dialogRef = this.matDialog.open(this.deleteDialog());
    const result = await firstValueFrom(dialogRef.afterClosed());

    if (!result) return;

    this.$loading.set(true);
    try {
      await firstValueFrom(this.productsService.deleteProduct(this.$productId()));
      this.notificationService.open('Product deleted successfully', 'success');
      this.router.navigate(['/products']);
    } finally {
      this.$loading.set(false);
    }
  }

  async update() {
    this.$loading.set(true);
    try {
      await firstValueFrom(
        this.productsService.updateProduct(Number(this.$productId()), {
          id: this.$productId(),
          ...this.form.value,
        } as Product),
      );
      this.notificationService.open('Product updated successfully', 'success');
    } finally {
      this.$loading.set(false);
    }
  }
}
