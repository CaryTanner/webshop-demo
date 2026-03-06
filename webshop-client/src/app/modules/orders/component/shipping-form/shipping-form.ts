import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-shipping-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
  ],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingForm {
  $form = input.required<FormGroup>();
  $countries = input.required<string[]>();
  $methods = input.required<string[]>();
  submitEmission = output<void>();
}
