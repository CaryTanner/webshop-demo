import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ItemTotal } from '../item-total/item-total';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  Appearance,
  PaymentIntentResult,
  Stripe,
  StripeElements,
  StripePaymentElement,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js';
import { StripeService } from '@common/services/stripe/stripe-service';
import { PaymentIntentResponse } from '@module/orders/order.interface';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { NotificationService } from '@common/services/notification/notification.service';

// Stripe UI component styles
const appearance: Appearance = {
  theme: 'flat' as const,
  variables: {
    colorPrimary: '#005db7', // primary 40
    colorBackground: '#fff',
    colorText: '#191c21',
    colorDanger: '#bc1127', // error 40
    fontFamily: 'Roboto, sans-serif',
    borderRadius: '4px',
    spacingUnit: '7px',
    colorTextPlaceholder: '#75777e', // neutral 50
  },
  rules: {
    '.Input': {
      border: '1px solid #5c5e65', // neutral 40
      padding: '10px',
      width: '100%',
    },
    '.Input:focus': {
      borderColor: '#005db7', // primary 40
      boxShadow: '0px 0px 3px 2px #e0e1f0', // dark-bg
    },
    '.Input--invalid': {
      boxShadow: '0px 0px 3px 2px #bc1127', // error 40
    },
    '.Label': {
      fontWeight: '600',
      fontSize: '14px',
      color: '#191c21',
    },
    '.Input::placeholder': {
      fontFamily: 'Roboto, sans-serif',
      color: '#75777e', // neutral 50
    },
  },
};

@Component({
  selector: 'app-payment-form',
  imports: [ReactiveFormsModule, MatButtonModule, ItemTotal, MatProgressSpinnerModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentForm implements AfterViewInit {
  paymentElementRef = viewChild<ElementRef>('paymentElement');
  $form = input.required<FormGroup>();
  $methods = input.required<string[]>();
  $submitDisabled = input<boolean>(false);
  submitEmission = output<void>();
  private notificationService = inject(NotificationService);
  private stripeService = inject(StripeService);
  private stripe: Stripe | null = null;
  public card: StripePaymentElement | undefined;
  public elements: StripeElements | undefined;
  public $stripeLoading = signal(true);
  public $paymentInputComplete = signal(false);

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

  async ngAfterViewInit() {
    const paymentIntentResp: PaymentIntentResponse = await firstValueFrom(
      this.stripeService.createPaymentIntent(),
    );
    if (
      !paymentIntentResp.paymentIntentId ||
      !paymentIntentResp.publishableKey ||
      !paymentIntentResp.clientSecret
    ) {
      this.announceError();
      return;
    }
    this.stripe = await this.stripeService.getStripePromise(paymentIntentResp.publishableKey);
    if (!this.stripe || !this.paymentElementRef()?.nativeElement) {
      this.announceError();
      return;
    }
    this.elements = this.stripe.elements({
      clientSecret: paymentIntentResp.clientSecret,
      appearance,
    });
    this.card = this.elements.create('payment');
    this.card.mount(this.paymentElementRef()?.nativeElement);
    this.card.on('ready', () => this.$stripeLoading.set(false));
    this.card.on('change', (event: StripePaymentElementChangeEvent) => {
      this.$paymentInputComplete.set(event.complete);
    });
  }

  announceError(msg = 'Payment service error, please try again later.') {
    this.notificationService.open(msg, 'error');
  }

  async confirmPayment() {
    try {
      this.$stripeLoading.set(true);
      const result: PaymentIntentResult = await this.stripe!.confirmPayment({
        elements: this.elements!,
        confirmParams: {
          return_url: `${window.location.origin}/checkout`,
        },
        redirect: 'if_required',
      });

      if (result.error) {
        this.announceError(result.error.message);
        return;
      }
      this.$form().patchValue({ stripePaymentIntentId: result.paymentIntent?.id });
      this.submitEmission.emit();
    } finally {
      this.$stripeLoading.set(false);
    }
  }
}
