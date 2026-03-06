import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewItems } from './review-items';

describe('ReviewItems', () => {
  let component: ReviewItems;
  let fixture: ComponentFixture<ReviewItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
