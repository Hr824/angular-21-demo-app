import { Routes } from '@angular/router';
import { AppSettings } from './app.custom.settings';
import { HomeComponent } from './pages/home/home-component';
import { ToDoListComponent } from './pages/to-do-list/to-do-list-component';
import { ErrorOccurredComponent } from './pages/errors/error-occurred/error-occurred-component';
import { PageNotFoundComponent } from './pages/errors/page-not-found/page-not-found-component';

export const routes: Routes = [
    {
        path: '',
        title: `${AppSettings.APP_TITLE} - Accueil`,
        component: HomeComponent
    },
    {
        path: 'todolist',
        title: `${AppSettings.APP_TITLE} - Todo List`,
        component: ToDoListComponent
    },
    {
        path: 'errorOccurred',
        title: `${AppSettings.APP_TITLE} - Erreur`,
        component: ErrorOccurredComponent
    },
    {
        path: 'pageNotFound',
        title: `${AppSettings.APP_TITLE} - Erreur 404`,
        component: PageNotFoundComponent
    },
    {
        path: '**',
        title: `${AppSettings.APP_TITLE} - Erreur 404`,
        component: PageNotFoundComponent
    }
];