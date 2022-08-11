import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom, of } from 'rxjs';
import { GeoJson } from '../interface/geo-json';
import { MeteoJson } from '../interface/meteo-json';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  const expectedResult: MeteoJson[] = [{
    temperature_2m: [12],
    relativehumidity_2m: [22],
    time: ['2022-08-11']
  }];
  const expectedResult2: GeoJson[] = [{
    id: 1,
    name: 'Paris',
    latitude: 52.60,
    longitude: 47.23
  }];
  const provide = (mock: any): any => mock;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppService],
      providers: [
        HttpClient
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('Init test : should create', () => {
    const httpMock = { get: jest.fn(() => of(expectedResult)) };
    service = new AppService(provide(httpMock));
    expect(service).toBeTruthy();
  });

  it('API test : should return geo data', async () => {
    const httpMock = { get: jest.fn(() => of(expectedResult)) };
    service = new AppService(provide(httpMock));
    const volumes$ = service.getGeo('Paris');
    expect(await lastValueFrom(volumes$)).toMatchObject(expectedResult);
  });

  it('API test : should return meteo data', async () => {
    const httpMock = { get: jest.fn(() => of(expectedResult2)) };
    service = new AppService(provide(httpMock));
    const categories$ = service.getMeteo('52.60', '47.23');
    expect(await lastValueFrom(categories$)).toMatchObject(expectedResult2);
  });
});
