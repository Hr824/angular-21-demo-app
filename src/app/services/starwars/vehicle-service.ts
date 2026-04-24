import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Vehicle, VehicleResponse } from '../../models/starwars/vehicle';
import { catchError, map, Observable, of } from 'rxjs';

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

  //===========================================
  //Avec httpClient et Observable
  //===========================================
  httpClient = inject(HttpClient);
  searchAllWithHttpClient(): Observable<Vehicle[]> {
    const vehicles$ = this.httpClient.get<VehicleResponse>(this.vehicleUrl).pipe(
      map(response => response.results),
      catchError(()=> of<Vehicle[]>([])) // En cas d'erreur, retourne un tableau vide
    );

    return vehicles$;
  }


  searchAllByModelWithHttpClient(vehicleModel: Signal<string>): Observable<Vehicle[]> {
    const vehicles$ = this.httpClient.get<VehicleResponse>(`${this.vehicleUrl}/?search=${vehicleModel()}`).pipe(
      map(response => response.results),
      catchError(()=> of<Vehicle[]>([])) // En cas d'erreur, retourne un tableau vide
    );

    return vehicles$;
  }
}
