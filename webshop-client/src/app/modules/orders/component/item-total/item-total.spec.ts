import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTotal } from './item-total';

xdescribe('ItemTotal', () => {
  let component: ItemTotal;
  let fixture: ComponentFixture<ItemTotal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTotal],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemTotal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
