import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SediComponent } from './sedi-page.component';

describe('SediComponent', () => {
  let component: SediComponent;
  let fixture: ComponentFixture<SediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SediComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SediComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
