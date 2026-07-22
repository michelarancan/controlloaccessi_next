import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngressoStabilimentoForm } from './ingresso-stabilimento-form.component';

describe('IngressoStabilimentoForm', () => {
  let component: IngressoStabilimentoForm;
  let fixture: ComponentFixture<IngressoStabilimentoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngressoStabilimentoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(IngressoStabilimentoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
