import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader-component';

@Component({
  selector: 'app-home-component',
  imports: [LoaderComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
}
