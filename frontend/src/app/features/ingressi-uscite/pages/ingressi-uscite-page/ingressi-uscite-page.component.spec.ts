import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngressiUsciteComponent } from './ingressi-uscite-page.component';

describe('IngressiUscite', () => {
  let component: IngressiUsciteComponent;
  let fixture: ComponentFixture<IngressiUsciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngressiUsciteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngressiUsciteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
