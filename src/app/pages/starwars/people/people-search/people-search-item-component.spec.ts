import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSearchItemComponent } from './people-search-item-component';

describe('PeopleSearchItemComponent', () => {
  let component: PeopleSearchItemComponent;
  let fixture: ComponentFixture<PeopleSearchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleSearchItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleSearchItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
