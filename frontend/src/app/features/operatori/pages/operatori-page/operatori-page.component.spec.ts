import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatoriComponent } from './operatori-page.component';

describe('Operatori', () => {
  let component: OperatoriComponent;
  let fixture: ComponentFixture<OperatoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatoriComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OperatoriComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
