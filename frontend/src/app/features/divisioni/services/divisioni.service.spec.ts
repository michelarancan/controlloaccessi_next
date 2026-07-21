import { TestBed } from '@angular/core/testing';

import { DivisioniService } from './divisioni.service';

describe('Divisioni', () => {
  let service: DivisioniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisioniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
