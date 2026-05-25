import { Routes } from '@angular/router';
import { AppSettings } from './app.custom.settings';
import { HomeComponent } from './pages/home/home-component';
import { ToDoListComponent } from './pages/to-do-list/to-do-list-component';
import { ErrorOccurredComponent } from './pages/errors/error-occurred/error-occurred-component';
import { PageNotFoundComponent } from './pages/errors/page-not-found/page-not-found-component';
import { PeopleSearchComponent } from './pages/starwars/people/people-search/people-search-component';
import { VehicleSelectComponent } from './pages/starwars/vehicle/vehicle-select/vehicle-select-component';
import { VehicleSelectSearchComponent } from './pages/starwars/vehicle/vehicle-select-search/vehicle-select-search-component';
import { AuthorListComponent } from './pages/dotnet-api/author/author-list/author-list-component';
import { AuthorDetailComponent } from './pages/dotnet-api/author/author-detail/author-detail-component';
import { AuthorCreateComponent } from './pages/dotnet-api/author/author-create/author-create-component';
import { AuthorUpdateComponent } from './pages/dotnet-api/author/author-update/author-update-component';
import { authGuard } from './guards/auth-guard';

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
        path: 'starwars/people-search',
        title: `${AppSettings.APP_TITLE} - Starwars People Search`,
        component: PeopleSearchComponent
    },
    {
        path: 'starwars/vehicle-select',
        title: `${AppSettings.APP_TITLE} - Starwars Vehicle Select`,
        component: VehicleSelectComponent
    },
    {
        path: 'starwars/vehicle-select-search',
        title: `${AppSettings.APP_TITLE} - Starwars Vehicle Select Search`,
        component: VehicleSelectSearchComponent
    },
    {
        path: 'dotnet-api/author-list',
        title: `${AppSettings.APP_TITLE} - Dotnet API Author List`,
        component: AuthorListComponent
    },
    {
        path: 'dotnet-api/author-detail/:id',
        title: `${AppSettings.APP_TITLE} - Dotnet API Author Detail`,
        component: AuthorDetailComponent
    },
    {
        path: 'dotnet-api/author-create',
        title: `${AppSettings.APP_TITLE} - Dotnet API Author Create`,
        component: AuthorCreateComponent,
        canActivate: [authGuard]
    },
    {
        path: 'dotnet-api/author-update/:id',
        title: `${AppSettings.APP_TITLE} - Dotnet API Author Update`,
        component: AuthorUpdateComponent
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