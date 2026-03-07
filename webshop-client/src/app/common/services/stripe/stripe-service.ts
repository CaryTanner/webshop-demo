import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  // private stripePromise: Promise<Stripe | null> | null = null;

  // constructor(private http: HttpClient) {}

  // getStripePromise() {
  //   if (!this.stripePromise) {
  //     this.stripePromise = loadStripe(environment.stripe_pk);
  //   }
  //   return this.stripePromise;
  // }

  // createSetupIntent(
  //   token: string,
  //   body: { regNo: string; email: string; country: string; postalCode: string; vatNumber: string },
  // ): Observable<{ clientSecret: string; customerId: string }> {
  //   return this.http
  //     .post(`${environment.base_url}/signup/create-setup-intent`, body, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //     .pipe(
  //       map((response: ProxyResponse<{ data: string; statusCode: number }>) => {
  //         if (response?.data?.statusCode !== 200 || !response?.data?.data) {
  //           throw new Error('Stripe service - create setup intent failed');
  //         }

  //         const { clientSecret, customerId } = JSON.parse(response.data.data);

  //         return { clientSecret, customerId };
  //       }),
  //     );
  // }

  // updateCustomerDefaultPaymentMethod(
  //   token: string,
  //   regNo: string,
  //   customerId: string,
  //   paymentMethodId: PaymentMethod | string,
  // ): Observable<StripeCustomer> {
  //   return this.http
  //     .post(
  //       `${environment.base_url}/signup/set-default-payment-method`,
  //       { regNo, customerId, paymentMethodId },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       },
  //     )
  //     .pipe(
  //       map((response: ProxyResponse<{ data: string; statusCode: number }>) => {
  //         if (response?.data?.statusCode !== 200 || !response?.data?.data) {
  //           throw new Error('Stripe service - set default payment method failed');
  //         }

  //         return JSON.parse(response.data.data);
  //       }),
  //     );
  // }
}
