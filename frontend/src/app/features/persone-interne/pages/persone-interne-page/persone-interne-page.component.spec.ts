import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneInterneComponent } from './persone-interne-page.component';

describe('SediComponent', () => {
  let component: PersoneInterneComponent;
  let fixture: ComponentFixture<PersoneInterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersoneInterneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersoneInterneComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
