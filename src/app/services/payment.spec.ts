import { TestBed } from '@angular/core/testing';
import { PaymentsService } from './payment';

describe('Payments', () => {
  let service: PaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
