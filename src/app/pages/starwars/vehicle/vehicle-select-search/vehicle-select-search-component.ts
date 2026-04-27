import { Component, computed, inject, signal } from '@angular/core';
import { VehicleService } from '../../../../services/starwars/vehicle-service';
import { Vehicle } from '../../../../models/starwars/vehicle';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-vehicle-select-search-component',
  imports: [FormsModule, UpperCasePipe],
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


  //===========================================
  //Avec httpClient et Observable
  //===========================================
  //OK le refresh fonctionne avec la dropdown
  //https://angular.fr/signals/to-signal
  //https://rxjs.dev/api/operators/switchMap
  // private httpClient = inject(HttpClient);
  // private vehicleUrl: string = 'https://swapi.py4e.com/api/vehicles';
  vehicles = toSignal(
    toObservable(this.selectedModel).pipe(
      switchMap(() => {
        if(this.selectedModel() === ''){
          return of<Vehicle[]>([]);
        }
        else{
          // this.httpClient.get<VehicleResponse>(`${this.vehicleUrl}/?search=${model}`).pipe(
          //   map(response => response.results)
          // )
          return this.vehicleService.searchAllByModelWithHttpClient(this.selectedModel);
        }
      }),
      catchError(() => of<Vehicle[]>([]))
    ),
    { initialValue: [] }
  );
}
