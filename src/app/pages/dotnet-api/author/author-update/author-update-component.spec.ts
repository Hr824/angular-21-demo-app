import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorUpdateComponent } from './author-update-component';

describe('AuthorUpdateComponent', () => {
  let component: AuthorUpdateComponent;
  let fixture: ComponentFixture<AuthorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorUpdateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
