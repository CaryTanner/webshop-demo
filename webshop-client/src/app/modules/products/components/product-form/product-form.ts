import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {

}
