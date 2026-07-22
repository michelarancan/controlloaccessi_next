import { TestBed } from '@angular/core/testing';

import { IngressiStabilimentoService } from './ingressi-stabilimento.service';

describe('IngressiStabilimento', () => {
  let service: IngressiStabilimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngressiStabilimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
