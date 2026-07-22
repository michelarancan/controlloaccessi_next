import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngressiStabilimentoComponent } from './ingressi-stabilimento-page.component';

describe('IngressiStabilimento', () => {
  let component: IngressiStabilimentoComponent;
  let fixture: ComponentFixture<IngressiStabilimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngressiStabilimentoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngressiStabilimentoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
