import { Component, computed, inject, input, signal } from '@angular/core';
import { PeopleService } from '../../../../services/starwars/people-service';
import { People } from '../../../../models/starwars/people';
import { PeopleSearchItemComponent } from './people-search-item-component';

@Component({
  selector: 'app-people-search-list-component',
  imports: [PeopleSearchItemComponent],
  templateUrl: './people-search-list-component.html',
  styleUrl: './people-search-list-component.css',
})
export class PeopleSearchListComponent {

  listCriteria = input("", {
    transform: (value: string) => value.toLowerCase()
  });

  peopleService = inject(PeopleService);

  // peopleListResource = this.peopleService.getAllPeopleResource();
  // peopleList = this.peopleListResource.value;
  // filteredPeopleList = computed(() => this.peopleList()?.results.filter(p => p.name.toLowerCase().includes(this.listCriteria())) ?? [] as People[]);
  

  //###########################################
  peopleUrl = signal<string | undefined>('https://swapi.py4e.com/api/people/?page=1');
  currentPage = signal<number>(1);

  peopleListResource = this.peopleService.getAllPeopleResourceWithPage(this.peopleUrl);
  
  peopleList = this.peopleListResource.value;
  filteredPeopleList = computed(() => this.peopleList()?.results.filter(p => p.name.toLowerCase().includes(this.listCriteria())) ?? [] as People[]);
  
  previousPage = computed(() => this.peopleListResource.value()?.previous);
  nextPage = computed(() => this.peopleListResource.value()?.next);

  previousButtonIsDisabled = computed(() => this.previousPage() === null ? true : false);
  nextButtonIsDisabled = computed(() => this.nextPage() === null ? true : false);

  gotoPreviousPage(): void {
    this.peopleUrl.set(this.previousPage());
    this.currentPage.update(val => val - 1);
  }

  gotoNextPage(): void {
    this.peopleUrl.set(this.nextPage());
    this.currentPage.update(val => val + 1);
  }

  gotoPage(numPage: number): void {
    this.peopleUrl.set(`https://swapi.py4e.com/api/people/?page=${numPage}`);
    this.currentPage.set(numPage);
  }
  
}
