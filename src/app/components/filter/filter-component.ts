import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-component',
  imports: [FormsModule],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css',
})
export class FilterComponent {
  filterLabel = input.required<string>();
  filter = model("");
}
