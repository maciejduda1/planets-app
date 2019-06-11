import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetsDataService {
  apiURL = 'https://swapi.co/api/planets/';
  constructor( private http: HttpClient ) { }

  getPlanetsData( URL = this.apiURL ) {
    return this.http.get( URL );
  }

}
