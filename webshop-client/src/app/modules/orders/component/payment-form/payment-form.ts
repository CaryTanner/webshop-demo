import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-payment-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
  ],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentForm {
  $form = input.required<FormGroup>();
  $methods = input.required<string[]>();
  submitEmission = output<void>();
}
