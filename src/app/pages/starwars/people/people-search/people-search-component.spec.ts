import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSearchComponent } from './people-search-component';

describe('PeopleSearchComponent', () => {
  let component: PeopleSearchComponent;
  let fixture: ComponentFixture<PeopleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleSearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
