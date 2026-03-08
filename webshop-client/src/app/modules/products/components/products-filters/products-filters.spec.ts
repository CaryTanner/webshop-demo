import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFilters } from './products-filters';

xdescribe('ProductsFilters', () => {
  let component: ProductsFilters;
  let fixture: ComponentFixture<ProductsFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
