import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorOccurredComponent } from './error-occurred-component';

describe('ErrorOccurredComponent', () => {
  let component: ErrorOccurredComponent;
  let fixture: ComponentFixture<ErrorOccurredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorOccurredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorOccurredComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
