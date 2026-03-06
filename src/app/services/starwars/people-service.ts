import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { PeopleResponse } from '../../models/starwars/people';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private peopleUrl: string = 'https://swapi.py4e.com/api/people';

  getAllPeopleResource() {
    return httpResource<PeopleResponse>(() => this.peopleUrl);
  }

  getAllPeopleResourceWithPage(peopleUrlWithPage: Signal<string | undefined>) {
    return httpResource<PeopleResponse>(() => peopleUrlWithPage());
  }
}
