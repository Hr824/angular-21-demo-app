import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoListComponent } from './to-do-list-component';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable(); // necessary to wait for the initial rendering
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render title "Todo List"', () => {
    const titleElement = fixture.nativeElement as HTMLElement;
    // expect(titleElement.querySelector('h3')?.textContent).toContain('Todo List');
    expect(titleElement.querySelector('#titre')?.textContent).toContain('Todo List');
  });
});
