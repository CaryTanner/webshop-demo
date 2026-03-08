import { TestBed } from '@angular/core/testing';
import { CustomErrorHandler } from './error-handler';

xdescribe('CustomErrorHandler', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomErrorHandler = TestBed.inject(CustomErrorHandler);

    expect(service).toBeTruthy();
  });
});
