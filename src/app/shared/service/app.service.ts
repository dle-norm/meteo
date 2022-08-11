import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GeoResponse } from '../interface/geo-json';
import { MeteoResponse } from '../interface/meteo-json';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  });

  constructor (private httpClient: HttpClient) {}

  /**
   * Get geoposition by city name.
   * @param city
   */
  getGeo (city: string): Observable<GeoResponse> {
    return this.httpClient.get<GeoResponse>(`http://localhost:4200/geo/search?name=${city}`, { headers: this.headers }).pipe(
      map(response => response)
    );
  }

  /**
   * Get meteo by city name.
   * @param city
   */
  getMeteo (latitude: string, longitude: string): Observable<MeteoResponse> {
    return this.httpClient.get<MeteoResponse>(`http://localhost:4200/meteo/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m&timezone=auto`, { headers: this.headers }).pipe(
      map(response => response)
    );
  }

  /**
   * Get meteo by city name on 7 days.
   * @param city
   */
  getWeekMeteo (latitude: string, longitude: string, dateStart: string, dateEnd: string): Observable<MeteoResponse> {
    return this.httpClient.get<MeteoResponse>(`http://localhost:4200/meteo/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m&timezone=auto&start_date=${dateStart}&end_date=${dateEnd}`, { headers: this.headers }).pipe(
      map(response => response)
    );
  }
}
