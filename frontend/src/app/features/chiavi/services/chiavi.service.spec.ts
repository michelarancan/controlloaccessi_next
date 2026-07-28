import { TestBed } from '@angular/core/testing';

import { ChiaveService } from './chiavi.service';

describe('Chiavi', () => {
  let service: ChiaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
