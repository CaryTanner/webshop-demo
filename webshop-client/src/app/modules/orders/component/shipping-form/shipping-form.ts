import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemTotal } from '../item-total/item-total';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-shipping-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    ItemTotal,
    MatAutocompleteModule,
    MatIcon,
    AsyncPipe,
  ],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingForm implements OnInit {
  $form = input.required<FormGroup>();
  $countries = input.required<string[]>();
  $methods = input.required<string[]>();
  submitEmission = output<void>();
  filteredCountries$: Observable<string[]> | undefined = undefined;

  ngOnInit() {
    this.filteredCountries$ = this.filterCountries();
  }

  filterCountries() {
    return this.$form()
      ?.get('country')
      ?.valueChanges.pipe(
        startWith(''),
        map((query) => {
          if (!this.$countries()?.length) return [];
          if (!query || typeof query !== 'string') return this.$countries();
          const filterValue = query.toLowerCase();
          return this.$countries().filter((country) => country.toLowerCase().includes(filterValue));
        }),
      );
  }
}
