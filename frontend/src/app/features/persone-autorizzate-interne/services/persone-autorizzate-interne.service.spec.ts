import { TestBed } from '@angular/core/testing';

import { PersoneAutorizzateInterneService } from './persone-autorizzate-interne.service';

describe('PersoneAutorizzateInterne', () => {
  let service: PersoneAutorizzateInterneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersoneAutorizzateInterneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
