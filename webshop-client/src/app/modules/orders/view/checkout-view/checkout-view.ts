import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { EU_COUNTRIES } from '@common/injection-tokens';
import { PaymentForm } from '@module/orders/component/payment-form/payment-form';
import { ReviewItems } from '@module/orders/component/review-items/review-items';
import { ShippingForm } from '@module/orders/component/shipping-form/shipping-form';
import { OrderService } from '@module/orders/service/order-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, map, of } from 'rxjs';
import { Order, PaymentMethod, ShippingMethod } from '@module/orders/order.interface';
import { AuthenticationService } from '@module/authentication/service/authentication-service';
import { NotificationService } from '@common/services/notification/notification.service';
import { Router } from '@angular/router';
import { R } from '@angular/cdk/keycodes';
import { ROUTE_PATHS } from 'src/app/app.routes';

@Component({
  selector: 'app-checkout-view',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    ReviewItems,
    ShippingForm,
    PaymentForm,
    MatTabsModule,
  ],
  templateUrl: './checkout-view.html',
  styleUrl: './checkout-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutView implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  public euCountries = inject(EU_COUNTRIES);
  private orderService = inject(OrderService);
  private authService = inject(AuthenticationService);
  public $cart = this.orderService.$cart;
  private sweden = this.euCountries.find((c) => c === 'Sweden');
  public paymentMethods: PaymentMethod[] = ['card', 'klarna'];
  public shippingMethods: ShippingMethod[] = ['PostNord', 'DHL', 'Bring'];
  public $selectedMatTabIndex = model(0);
  public form = this.buildForm();
  public $isShippingFormValid = toSignal(
    this.form?.get('shipping')?.statusChanges.pipe(
      map((value: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED') => {
        return value === 'VALID';
      }),
    ) ?? of(false),
    {
      initialValue: false,
    },
  );
  public $loading = signal(false);

  ngOnInit() {
    // set on init to have access to control list
    const countryControl = this.form.get('shipping')?.get('country');
    if (countryControl) {
      countryControl.setValidators([this.countryInfoObjectValidator.bind(this)]);
      countryControl.updateValueAndValidity();
    }
  }

  buildForm() {
    return this.fb.group({
      userId: this.authService.$user()?.userId,
      orderItems: this.fb.group({
        items: this.fb.array([]),
      }),
      payment: this.fb.group({
        method: [this.paymentMethods[0]],
        stripePaymentIntentId: ['test_intent_id'],
      }),
      shipping: this.fb.group({
        firstName: ['first_name_Test', Validators.required],
        lastName: ['last_name_Test', Validators.required],
        addressLineOne: ['address_line_one_Test', Validators.required],
        addressLineTwo: ['address_line_two_Test'],
        city: ['city_Test', Validators.required],
        postalCode: ['postal_code_Test', Validators.required],
        country: [this.sweden],
        method: [this.shippingMethods[0]],
      }),
    });
  }

  async submitOrder() {
    if (this.form.invalid) return;
    console.log('sub order', this.form.value);
    this.$loading.set(true);
    try {
      const orderData = {
        ...this.form.value,
        items: this.form.value.orderItems?.items,
      } as Partial<Order>;
      const orderId = await firstValueFrom(this.orderService.createOrder(orderData));
      if (!orderId) return;
      //this.orderService.clearCart();
      this.notificationService.open('Order created successfully!');
      this.router.navigate([ROUTE_PATHS.orders['summaryBase'], orderId]);
    } catch (err) {
      this.handleSubmitError(err);
    } finally {
      this.$loading.set(false);
    }
  }

  async handleSubmitError(err: Error | unknown) {
    if (!err || !(err instanceof Error)) {
      this.notificationService.open('Order creation failed. Please try again.');
      return;
    }

    if (err && err instanceof Error) {
      if (err.message.includes('UPDATE_FAILED')) {
        const id = err.message.split('UPDATE_FAILED ')[1];
        try {
          this.$loading.set(true);
          await firstValueFrom(this.orderService.deleteOrder(Number(id)));

          this.notificationService.open("We couldn't finalize your order, please try again.");
        } finally {
          this.$loading.set(false);
        }
      }
    }
  }

  countryInfoObjectValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value && this.euCountries.some((country) => country === value)) {
      control.setErrors(null);
      return null;
    }
    control.setErrors({ countryInfoInvalid: true });
    return { countryInfoInvalid: true };
  }
}
