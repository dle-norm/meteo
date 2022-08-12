import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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
    return this.httpClient.get<GeoResponse>(`${environment.geo}/search?name=${city}`).pipe(
      map(response => response)
    );
  }

  /**
   * Get meteo by city name.
   * @param city
   */
  getMeteo (latitude: string, longitude: string): Observable<MeteoResponse> {
    return this.httpClient.get<MeteoResponse>(`${environment.meteo}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m&timezone=auto`).pipe(
      map(response => response)
    );
  }

  /**
   * Get meteo by city name on 7 days.
   * @param city
   */
  getWeekMeteo (latitude: string, longitude: string, dateStart: string, dateEnd: string): Observable<MeteoResponse> {
    return this.httpClient.get<MeteoResponse>(`${environment.meteo}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m&timezone=auto&start_date=${dateStart}&end_date=${dateEnd}`).pipe(
      map(response => response)
    );
  }
}
