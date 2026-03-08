import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutView } from './checkout-view';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StripeService } from '@common/services/stripe/stripe-service';
import { OrderService } from '@module/orders/service/order-service';
import { NotificationService } from '@common/services/notification/notification.service';
import { of } from 'rxjs';
import {
  categories,
  EU_COUNTRIES,
  euCountries,
  PRODUCT_CATEGORIES,
  SVG_TYPES,
  svgTypes,
} from '@common/injection-tokens';
import { AuthenticationService } from '@module/authentication/service/authentication-service';

@Component({
  selector: 'app-dummy',
  imports: [],
  templateUrl: './checkout-view.html',
  styleUrl: './checkout-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DummyComponent {}

describe('CheckoutView', () => {
  let component: CheckoutView;
  let fixture: ComponentFixture<CheckoutView>;
  let orderService: jasmine.SpyObj<OrderService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    orderService = jasmine.createSpyObj('OrderService', [
      'createOrder',
      'updateOrder',
      'clearCart',
      'deleteOrder',
      '$cart',
      '$cartTotal',
    ]);
    notificationService = jasmine.createSpyObj('NotificationService', ['open']);

    await TestBed.configureTestingModule({
      imports: [CheckoutView],
      providers: [
        StripeService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: OrderService, useValue: orderService },
        { provide: NotificationService, useValue: notificationService },
        { provide: AuthenticationService, useValue: { $user: () => ({ userId: 1 }) } },
        { provide: SVG_TYPES, useValue: svgTypes },
        { provide: PRODUCT_CATEGORIES, useValue: categories },
        { provide: EU_COUNTRIES, useValue: euCountries },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build a form with expected controls', () => {
    const form = component.form;
    expect(form.contains('userId')).toBeTrue();
    expect(form.contains('orderItems')).toBeTrue();
    expect(form.contains('payment')).toBeTrue();
    expect(form.contains('shipping')).toBeTrue();
  });

  it('should validate countryInfoObjectValidator correctly', () => {
    const control = component.form.get('shipping')?.get('country');
    if (!control) return;
    // Valid country
    control.setValue(euCountries.find((c) => c === 'Sweden'));
    expect(component.countryInfoObjectValidator(control)).toBeNull();
    // Invalid country
    control.setValue('Swe' as 'Sweden');
    expect(component.countryInfoObjectValidator(control)).toEqual({ countryInfoInvalid: true });
  });

  it('should not submit order if form is invalid', async () => {
    spyOn(component, 'submitOrder').and.callThrough();
    component.form.setErrors({ invalid: true });
    await component.submitOrder();
    expect(component.submitOrder).toHaveBeenCalled();
  });

  it('should handle submit error and call deleteOrder and notification', async () => {
    orderService.deleteOrder.and.returnValue(of({} as any));
    await component.handleSubmitError(123);
    expect(orderService.deleteOrder).toHaveBeenCalledWith(123);
    expect(notificationService.open).toHaveBeenCalledWith(
      "We couldn't finalize your order, please try again.",
    );
  });

  it('should handle submit error with undefined orderId', async () => {
    await component.handleSubmitError(undefined);
    expect(notificationService.open).toHaveBeenCalledWith(
      'Order creation failed. Please try again.',
    );
  });

  it('should validate $isShippingFormValid signal', () => {
    // Initially invalid
    expect(component.$isShippingFormValid()).toBeFalse();
    // Make shipping form valid
    const shippingForm = component.form.get('shipping');
    shippingForm?.setValue({
      firstName: 'John',
      lastName: 'Doe',
      addressLineOne: '123 Main St',
      addressLineTwo: '',
      city: 'Stockholm',
      postalCode: '12345',
      country: 'Sweden',
      method: 'PostNord',
    });
    shippingForm?.markAsTouched();
    shippingForm?.markAsDirty();
    shippingForm?.updateValueAndValidity();
    expect(component.$isShippingFormValid()).toBeTrue();
  });
});
