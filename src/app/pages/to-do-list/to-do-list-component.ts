import { Component, ElementRef, inject, OnInit, signal, viewChildren } from '@angular/core';
import { TodoItem } from '../../models/to-do-list/to-do-item';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const regexPattern: string = '^([A-Za-zàâäéèêëîïôöùûüçÇÀÂÄÉÈÊËÎÏÔÖÙÛÜ -\']*)$';

@Component({
  selector: 'app-to-do-list-component',
  imports: [ReactiveFormsModule],
  templateUrl: './to-do-list-component.html',
  styleUrl: './to-do-list-component.css',
})
export class ToDoListComponent implements OnInit {

    statusFiltersOptions = viewChildren<ElementRef<HTMLInputElement>>('statusFiltersOptions');

    todoList = signal<TodoItem[]>([] as TodoItem[]);
    todoForm! : FormGroup;

    private formBuilder = inject(FormBuilder);

    ngOnInit(): void {
      this.todoForm = this.formBuilder.group({
        description: ['', [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(regexPattern)]
        ]
      });


      const storedTodoList = window.localStorage ? localStorage.getItem('todoList') : null;
      const initialTodoList: TodoItem[] = storedTodoList ? JSON.parse(storedTodoList) : [] as TodoItem[];
      this.todoList.set(initialTodoList);
    }

    /**
     * Submit the form to create ann item
     */
    onSubmit(): void {
      if(this.todoForm.valid){
        //  console.table(this.todoForm.value);
        //  console.log('description', this.todoForm.controls['description'].value);

        const descript: string = this.todoForm.controls['description'].value;

        const storedTodoList = window.localStorage ? localStorage.getItem('todoList') : null;
        const currentTodoList: TodoItem[] = storedTodoList ? JSON.parse(storedTodoList) : [] as TodoItem[];

        const maxItemId = currentTodoList.reduce(
          (max, todoItem) => (todoItem.id > max ? todoItem.id : max),
          0
        );

        const itemToAdd: TodoItem = {
                    id: maxItemId + 1,
                    description: descript.trim(),
                    done: false
                };

        if(currentTodoList.length === 0) {
          this.statusFiltersOptions()[0].nativeElement.checked = true;
        }

        currentTodoList.push(itemToAdd);
        localStorage.setItem('todoList', JSON.stringify(currentTodoList));

        let filterValue = '';
        this.statusFiltersOptions().forEach(item => {
          if(item.nativeElement.checked)
            filterValue = item.nativeElement.value;
        });

        this.setTodoList(filterValue, currentTodoList);

        this.todoForm.reset();
      }
    }

    /**
     * Clear the form
     */
    onReset() {
      this.todoForm.reset();
    }


    /**
     * To display or not the error message if the form is not valid
     * @param controlName
     * @param errorCode 
     * @returns 
     */
    showErrorMessage(controlName: string, errorCode: string): boolean {
      const control = this.todoForm.controls[controlName];

      // return control.hasError(errorCode) && (control.touched || control.dirty);
      return control.hasError(errorCode) && control.dirty;
    }


    /**
     * Change item status
     * @param itemId
     * @param event 
     */
    changeTodoItemStatus(itemId: number, event:Event){

      const isChecked = (<HTMLInputElement>event.target).checked; //(event.target as HTMLInputElement).checked;

      const storedTodoList = window.localStorage ? localStorage.getItem('todoList') : null;
      const currentTodoList: TodoItem[] = storedTodoList ? JSON.parse(storedTodoList) : [] as TodoItem[];

      let itemToUpdate = currentTodoList.find(item => item.id === itemId);
      if(itemToUpdate) {
        itemToUpdate.done = isChecked;
      }

      localStorage.setItem('todoList', JSON.stringify(currentTodoList));

      let filterValue = '';
      this.statusFiltersOptions().forEach(item => {
        if(item.nativeElement.checked)
          filterValue = item.nativeElement.value;
      });
      
      this.setTodoList(filterValue, currentTodoList);
    }

    /**
     * Clear the todoList and the localStorage
     */
    clearTodoList(): void {
      this.todoList.set([]);
      localStorage.removeItem('todoList');
    }


    /**
     * Remove item in the list
     * @param itemId Item id to remove
     */
    removeTodoItem(itemId: number): void {

      const storedTodoList = window.localStorage ? localStorage.getItem('todoList') : null;
      let currentTodoList: TodoItem[] = storedTodoList ? JSON.parse(storedTodoList) : [] as TodoItem[];

      currentTodoList = currentTodoList.filter(item => item.id !== itemId);

      if(currentTodoList.length === 0) {
        this.todoList.set([]);
        localStorage.removeItem('todoList');
      }
      else{
        localStorage.setItem('todoList', JSON.stringify(currentTodoList));

        let filterValue = '';
        this.statusFiltersOptions().forEach(item => {
          if(item.nativeElement.checked)
            filterValue = item.nativeElement.value;
        });

        this.setTodoList(filterValue, currentTodoList);
      }
    }

    /**
     * Change filter
     * @param event
     */
    onStatusFilterChange(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;

      const storedTodoList = window.localStorage ? localStorage.getItem('todoList') : null;
      const currentTodoList: TodoItem[] = storedTodoList ? JSON.parse(storedTodoList) : [] as TodoItem[];

      this.setTodoList(filterValue, currentTodoList);
    }


    /**
     * Set todoList
     * @param filterValue
     * @param todoList 
     */
    private setTodoList(filterValue: string, todoList: TodoItem[]): void {
      if(filterValue === 'option3') { //option3 = tout
          this.todoList.set(todoList);
      }
      else {
        const done: boolean = (filterValue === 'option1' ? false : true); //option1 = en cours / option2 = terminée

        this.todoList.set(todoList.filter(item => item.done === done));
      }
    }
}