import { TestBed } from '@angular/core/testing';

import { Sedi } from './sedi.service';

describe('Sedi', () => {
  let service: Sedi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sedi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
