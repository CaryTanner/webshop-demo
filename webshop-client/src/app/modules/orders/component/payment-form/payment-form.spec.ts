import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentForm } from './payment-form';

xdescribe('PaymentForm', () => {
  let component: PaymentForm;
  let fixture: ComponentFixture<PaymentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
