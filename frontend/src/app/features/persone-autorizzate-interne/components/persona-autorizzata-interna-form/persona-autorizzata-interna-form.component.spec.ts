import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaAutorizzataInternaForm } from './persona-autorizzata-interna-form.component';

describe('PersonaAutorizzataInternaForm', () => {
  let component: PersonaAutorizzataInternaForm;
  let fixture: ComponentFixture<PersonaAutorizzataInternaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaAutorizzataInternaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaAutorizzataInternaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
