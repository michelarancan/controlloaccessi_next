import { TestBed } from '@angular/core/testing';

import { PersoneInterneService } from './persone-interne.service';

describe('PersoneInterne', () => {
  let service: PersoneInterneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersoneInterneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
