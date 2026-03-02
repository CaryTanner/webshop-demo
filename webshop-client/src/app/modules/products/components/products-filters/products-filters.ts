import { ChangeDetectionStrategy, Component, effect, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PRODUCT_CATEGORIES, SVG_TYPES } from '@common/injection-tokens';
import { GetProductsParams } from '@module/products/product.interface';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-products-filters',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './products-filters.html',
  styleUrl: './products-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFilters {
  private fb = inject(FormBuilder);
  svgTypes = inject(SVG_TYPES);
  categories = inject(PRODUCT_CATEGORIES);
  queryEvent = output<GetProductsParams>();

  sortOptions = [
    { text: 'Name A-Z', sortBy: 'name', sortDirection: 'asc' },
    { text: 'Name Z-A', sortBy: 'name', sortDirection: 'desc' },
    { text: 'Price: increasing', sortBy: 'price', sortDirection: 'asc' },
    { text: 'Price: decreasing', sortBy: 'price', sortDirection: 'desc' },
  ];

  form = this.fb.group({
    search: [''],
    sort: [this.sortOptions[0]],
    inStock: [false],
    categoryIds: [[]],
    skip: [0],
    limit: [1000], // TODO: implement pagination and remove this default limit
  });

  $formValueChanges = toSignal(
    this.form.valueChanges.pipe(
      debounceTime(300),
      map((formValues) => {
        const { sort, ...rest } = formValues;
        return {
          ...rest,
          sortBy: sort?.sortBy,
          sortDirection: sort?.sortDirection,
        };
      }),
    ),
    {
      initialValue: {
        ...this.form.value,
        sortBy: this.form.value.sort?.sortBy,
        sortDirection: this.form.value.sort?.sortDirection,
      },
    },
  );

  constructor() {
    effect(() => {
      const formValue = this.$formValueChanges();
      this.queryEvent.emit(formValue as GetProductsParams);
    });
  }
}
