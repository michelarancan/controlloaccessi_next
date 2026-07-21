import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaInternaForm } from './persona-interna-form.component';

describe('PersoneInterneForm', () => {
  let component: PersonaInternaForm;
  let fixture: ComponentFixture<PersonaInternaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaInternaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaInternaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
