import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSelectSearchComponent } from './vehicle-select-search-component';

describe('VehicleSelectSearchComponent', () => {
  let component: VehicleSelectSearchComponent;
  let fixture: ComponentFixture<VehicleSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleSelectSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleSelectSearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
