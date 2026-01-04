import { Component, ElementRef, inject, OnInit, signal, viewChild, viewChildren } from '@angular/core';
import { TodoItem } from '../../models/to-do-list/to-do-item';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

const regexPattern: string = '^([A-Za-zàâäéèêëîïôöùûüçÇÀÂÄÉÈÊËÎÏÔÖÙÛÜ -\']*)$';

@Component({
  selector: 'app-to-do-list-component',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './to-do-list-component.html',
  styleUrl: './to-do-list-component.css',
})
export class ToDoListComponent implements OnInit {
    descriptionElement = viewChild<ElementRef<HTMLInputElement>>('descriptionItem');
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


    onSubmit(): void {
      if(this.todoForm.valid){
        //  console.table(this.todoForm.value);
        //  console.log('description', this.todoForm.controls['description'].value);

        const descript: string = this.todoForm.controls['description'].value;

        const storedTodoList = window.localStorage ? localStorage.getItem('todoList') : null;
        const currentTodoList: TodoItem[] = storedTodoList ? JSON.parse(storedTodoList) : [] as TodoItem[];

        //https://www.danvega.dev/blog/find-max-array-objects-javascript
        const maxId = currentTodoList.reduce(
          (max, todoItem) => (todoItem.id > max ? todoItem.id : max),
          0
        );

        //console.log('maxId', maxId);


        const itemToAdd: TodoItem = {
                    id: maxId + 1,
                    description: descript.trim(),
                    done: false
                };

        //this.todoList.update(currentTodoList => [...currentTodoList, itemToAdd]);
        currentTodoList.push(itemToAdd);
        this.todoList.set(currentTodoList);

        localStorage.setItem('todoList', JSON.stringify(this.todoList()));

        this.todoForm.reset();

        //this.focusDescription();
      }
    }


    onReset() {
      this.todoForm.reset();
      //this.focusDescription();
    }

    focusDescription(): void {
      const elmt = this.descriptionElement();
      if (elmt) {
        elmt.nativeElement.focus();
      }
    }


    showErrorMessage(controlName: string, errorCode: string): boolean {
      const control = this.todoForm.controls[controlName];

      // return control.hasError(errorCode) && (control.touched || control.dirty);
      return control.hasError(errorCode) && control.dirty;
    }



    changeTodoItemStatus(itemId: number, event:Event){

      const isChecked = (<HTMLInputElement>event.target).checked;
      //const isChecked = (event.target as HTMLInputElement).checked;

      console.log('HTMLInputElement', event);

      const storedTodoList = window.localStorage ? localStorage.getItem('todoList') : null;
      const currentTodoList: TodoItem[] = storedTodoList ? JSON.parse(storedTodoList) : [] as TodoItem[];

      //https://www.geeksforgeeks.org/javascript/how-to-modify-an-objects-property-in-an-array-of-objects-in-javascript/
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
      

      if(filterValue === 'option3') { //option3 = tout
        this.todoList.set(currentTodoList);
      }
      else {
        const done: boolean = (filterValue === 'option1' ? false : true); //option1 = en cours / option2 = terminée

        this.todoList.set(currentTodoList.filter(item => item.done === done));
      }

      // console.log('TODOLIST : ',this.todoList());
    }


    clearTodoList(): void {
      this.todoList.set([]);
      localStorage.removeItem('todoList');
    }


    removeTodoItem(itemId: number): void {
      this.todoList.update(items => items.filter(item => item.id !== itemId));

      if(this.todoList().length === 0) {
        localStorage.removeItem('todoList');
      }
      else{
        localStorage.setItem('todoList', JSON.stringify(this.todoList()));
      }
    }


    //Changement du filtre
    onStatusFilterChange(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      //console.log('RADIO BUTTON', filterValue);

      const storedTodoList = window.localStorage ? localStorage.getItem('todoList') : null;
      const currentTodoList: TodoItem[] = storedTodoList ? JSON.parse(storedTodoList) : [] as TodoItem[];

      if(filterValue === 'option3') { //option3 = tout
        this.todoList.set(currentTodoList);
      }
      else {
        const done: boolean = (filterValue === 'option1' ? false : true); //option1 = en cours / option2 = terminée

        this.todoList.set(currentTodoList.filter(item => item.done === done));
      }

      //console.log('TODOLIST : ',this.todoList());
    }
}