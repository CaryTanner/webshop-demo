import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemTotal } from '../item-total/item-total';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-payment-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    ItemTotal,
    MatProgressSpinnerModule,
  ],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentForm {
  $form = input.required<FormGroup>();
  $methods = input.required<string[]>();
  $submitDisabled = input<boolean>(false);
  submitEmission = output<void>();

  constructor() {
    // disable form during create order
    effect(() => {
      const isDisabled = this.$submitDisabled();
      if (isDisabled && this.$form().enabled) {
        this.$form()?.disable();
      } else if (this.$form().disabled) {
        this.$form()?.enable();
      }
    });
  }
}
