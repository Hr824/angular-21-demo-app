import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { VehicleResponse } from '../../models/starwars/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicleUrl: string = 'https://swapi.py4e.com/api/vehicles';


  getAllVehicleHttpResource() {
    return httpResource<VehicleResponse>(() => this.vehicleUrl);
  }

  //Appelle l'API au chargement de la page
  // searchAllVehicleByModel(vehicleModel: Signal<string>) {
  //   return httpResource<VehicleResponse>(() => `${this.vehicleUrl}/?search=${vehicleModel()}`);
  // }

  //Retourner 'undefined' permet de ne pas appeler l'API au chargement de la page
  searchAllVehicleByModel(vehicleModel: Signal<string>) {
    return httpResource<VehicleResponse>(() => vehicleModel() ? `${this.vehicleUrl}/?search=${vehicleModel()}` : undefined);
  }
}
