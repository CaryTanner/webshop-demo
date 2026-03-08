import { TestBed } from '@angular/core/testing';
import { StripeService } from './stripe-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderService } from '@module/orders/service/order-service';
import { PaymentIntentResponse } from '@module/orders/order.interface';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('StripeService', () => {
  let service: StripeService;
  let httpMock: HttpTestingController;
  let mockOrderService: Partial<OrderService>;

  beforeEach(() => {
    mockOrderService = {
      $cartTotal: signal(123.45),
    };

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        StripeService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideZonelessChangeDetection(),
        { provide: OrderService, useValue: mockOrderService },
      ],
    });

    service = TestBed.inject(StripeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a stripe promise', async () => {
    const stripePublicKey = 'pk_test_123';
    const promise = await service.getStripePromise(stripePublicKey);

    expect(promise).toBeTruthy();
    // Should always return the same promise instance
    expect(await service.getStripePromise(stripePublicKey)).toBe(promise);
  });

  it('should create a payment intent', () => {
    const mockResponse: PaymentIntentResponse = {
      clientSecret: 'secret_123',
      paymentIntentId: 'pi_123',
      publishableKey: 'pk_test_123',
    };

    service.createPaymentIntent().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      (req) => req.method === 'POST' && req.url.includes('/payments/create-payment-intent'),
    );
    expect(req.request.body.amount).toBe(123.45);
    req.flush(mockResponse);
  });
});
