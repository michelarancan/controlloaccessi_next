import { TestBed } from '@angular/core/testing';

import { AziendeService } from './aziende.service';

describe('Aziende', () => {
  let service: AziendeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AziendeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
