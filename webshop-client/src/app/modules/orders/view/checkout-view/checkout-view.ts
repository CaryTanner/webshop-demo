import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { EU_COUNTRIES } from '@common/injection-tokens';
import { PaymentForm } from '@module/orders/component/payment-form/payment-form';
import { ReviewItems } from '@module/orders/component/review-items/review-items';
import { ShippingForm } from '@module/orders/component/shipping-form/shipping-form';
import { OrderService } from '@module/orders/service/order-service';
import { ConfirmOrder } from '@module/orders/component/confirm-order/confirm-order';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkoutSteps = {
  items: 'items',
  shipping: 'shipping',
  payment: 'payment',
  confirm: 'confirm',
} as const;

export type CheckoutStep = (typeof checkoutSteps)[keyof typeof checkoutSteps];

@Component({
  selector: 'app-checkout-view',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    ReviewItems,
    ShippingForm,
    PaymentForm,
    MatTabsModule,
    ConfirmOrder,
  ],
  templateUrl: './checkout-view.html',
  styleUrl: './checkout-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutView {
  private fb = inject(FormBuilder);
  public euCountries = inject(EU_COUNTRIES);
  private orderService = inject(OrderService);
  public $cart = this.orderService.$cart;
  private sweden = this.euCountries.indexOf('Sweden') !== -1 ? 'Sweden' : this.euCountries[0];
  public paymentMethods = ['Klarna', 'Stripe', 'PayPal'];
  public shippingMethods = ['PostNord', 'DHL', 'Bring'];
  public STEPS: CheckoutStep[] = ['items', 'shipping', 'payment', 'confirm'];

  public form = this.buildForm();
  public $currentStep = signal<CheckoutStep>('items');
  public $completedSteps = signal<Set<CheckoutStep>>(new Set());
  public $canGoBack = computed(() => {
    return this.STEPS.indexOf(this.$currentStep()) > 0;
  });
  public $canViewShipping = computed(() => {
    return this.$completedSteps().has('items');
  });
  public $canViewPayment = computed(() => {
    return this.$completedSteps().has('shipping');
  });
  public $canViewConfirm = computed(() => {
    return this.$completedSteps().has('payment');
  });

  buildForm() {
    return this.fb.group({
      userId: null,
      orderItems: this.fb.group({
        items: this.fb.array([]),
      }),
      payment: this.fb.group({
        method: [this.paymentMethods[0]],
        paymentOnDelivery: [false],
      }),
      shipping: this.fb.group({
        fullName: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: [this.sweden, Validators.required],
        method: [this.shippingMethods[0]],
      }),
    });
  }
}
