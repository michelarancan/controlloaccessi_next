import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatoreForm } from './operatore-form.component';

describe('OperatoreForm', () => {
  let component: OperatoreForm;
  let fixture: ComponentFixture<OperatoreForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatoreForm],
    }).compileComponents();

    fixture = TestBed.createComponent(OperatoreForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
