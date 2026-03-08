import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@env/environment';
import { Observable } from 'rxjs';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { OrderService } from '@module/orders/service/order-service';
import { PaymentIntentResponse } from '@module/orders/order.interface';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise: Promise<Stripe | null> | null = null;
  private http = inject(HttpClient);
  private orderService = inject(OrderService);

  getStripePromise(stripePublicKey: string) {
    if (!this.stripePromise) {
      this.stripePromise = loadStripe(stripePublicKey);
    }
    return this.stripePromise;
  }

  createPaymentIntent(): Observable<PaymentIntentResponse> {
    const amount = this.orderService.$cartTotal();
    return this.http.post<PaymentIntentResponse>(`${BASE_URL}/payments/create-payment-intent`, {
      amount,
    });
  }
}
