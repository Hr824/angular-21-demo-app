import { Component } from '@angular/core';
import { FilterComponent } from '../../../../components/filter-component';
import { PeopleSearchListComponent } from './people-search-list-component';

@Component({
  selector: 'app-people-search-component',
  imports: [FilterComponent, PeopleSearchListComponent],
  templateUrl: './people-search-component.html',
  styleUrl: './people-search-component.css',
})
export class PeopleSearchComponent {

  listFilter = "";
}
