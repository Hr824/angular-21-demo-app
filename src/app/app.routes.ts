import { Routes } from '@angular/router';
import { ToDoListComponent } from './pages/to-do-list/to-do-list-component';
import { AppSettings } from './app.custom.settings';

export const routes: Routes = [
    {
        path: 'todolist',
        title: `${AppSettings.APP_TITLE} - Todo List`,
        component: ToDoListComponent
    }
];
