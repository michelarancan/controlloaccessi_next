import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneAutorizzateInterneComponent } from './persone-autorizzate-interne-page.component';

describe('PersoneAutorizzateInterne', () => {
  let component: PersoneAutorizzateInterneComponent;
  let fixture: ComponentFixture<PersoneAutorizzateInterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersoneAutorizzateInterneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersoneAutorizzateInterneComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
