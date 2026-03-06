import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSearchListComponent } from './people-search-list-component';

describe('PeopleSearchListComponent', () => {
  let component: PeopleSearchListComponent;
  let fixture: ComponentFixture<PeopleSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleSearchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleSearchListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
