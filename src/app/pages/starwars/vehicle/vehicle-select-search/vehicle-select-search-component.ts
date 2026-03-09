import { Component, computed, inject, signal } from '@angular/core';
import { VehicleService } from '../../../../services/starwars/vehicle-service';
import { Vehicle } from '../../../../models/starwars/vehicle';
import { JsonPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-select-search-component',
  imports: [FormsModule, JsonPipe, UpperCasePipe],
  templateUrl: './vehicle-select-search-component.html',
  styleUrl: './vehicle-select-search-component.css',
})
export class VehicleSelectSearchComponent {

  vehicleService = inject(VehicleService);

   vehicleModels = signal<string[]>([
    'landspeeder', 'airspeeder', 'bomber', 'transport', 'crawler', 'skyhopper', 'starfighter', 'barge', 'novehicle'
  ]);

  //Modèle de véhicule sélectionné dans la liste déroulante
  selectedModel = signal<string>('');

  //HttpResource
  vehicleHttpResource = this.vehicleService.searchAllVehicleByModel(this.selectedModel);

  //Signals resource
  filteredVehicleList = computed(() => this.vehicleHttpResource.value()?.results ?? [] as Vehicle[]);
  error = computed(() => this.vehicleHttpResource.error() as HttpErrorResponse);
  isLoading = computed(() => this.vehicleHttpResource.isLoading());


}
