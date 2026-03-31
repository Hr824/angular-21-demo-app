import { Component, computed, inject, signal } from '@angular/core';
import { Vehicle } from '../../../../models/starwars/vehicle';
import { VehicleService } from '../../../../services/starwars/vehicle-service';
import { FormsModule } from '@angular/forms';
//import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-select-component',
  imports: [FormsModule],//[FormsModule, JsonPipe],
  templateUrl: './vehicle-select-component.html',
  styleUrl: './vehicle-select-component.css',
})
export class VehicleSelectComponent {

  vehicleService = inject(VehicleService);

  //Liste déroulante pour sélectionner un véhicule
  vehicleHttpResource = this.vehicleService.getAllVehicleHttpResource();
  vehicleList = computed(() => this.vehicleHttpResource.value()?.results ?? [] as Vehicle[]);

  //Véhicule sélectionné dans la liste déroulante
  selectedVehicle = signal<Vehicle | undefined>(undefined);
}
