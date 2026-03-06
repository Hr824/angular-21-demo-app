import { Component, input } from '@angular/core';
import { People } from '../../../../models/starwars/people';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: '[app-people-search-item-component]',
  imports: [UpperCasePipe],
  templateUrl: './people-search-item-component.html',
  styleUrl: './people-search-item-component.css',
})
export class PeopleSearchItemComponent {
  people = input<People>({} as People);

  //###################################################
  //Pour résoudre le problème du child component avec une boucle @for dans un tableau
  //How to Solve the Angular Child Component Breaks Table Issue 
  //https://www.youtube.com/watch?v=DmAK42TrivA
  //###################################################

}
