import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from '../../shared/service/app.service';
import { lastValueFrom } from 'rxjs';
import { MeteoResponse } from 'src/app/shared/interface/meteo-json';
import { GeoJson } from 'src/app/shared/interface/geo-json';
import { ActivatedRoute, Router } from '@angular/router';
import { Week } from 'src/app/shared/interface/week';

@Component({
  selector: 'app-weather-week',
  templateUrl: './weather-week.component.html',
  styleUrls: ['./weather-week.component.scss']
})
export class WeatherWeekComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['date', 'temperature', 'humidite'];
  public dataSource = new MatTableDataSource<Week>();
  public isLoading = true;
  public currentTime: string = new Date().toISOString().split('T')[0];
  public nextWeekTime: string = new Date(new Date().setDate(new Date().getDate() + 6)).toISOString().split('T')[0];
  public city: string = '';
  public data: Week[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private service: AppService, private route: ActivatedRoute, private router: Router) { }
  async ngOnInit () {
    await this.getAllMeteo();
    this.isLoading = false;
  }

  async getAllMeteo (): Promise<void> {
    this.city = this.route.snapshot.paramMap.get('city');
    if (this.city === 'Votre position') {
      this.city = 'votre position';
      navigator.geolocation.getCurrentPosition(async (position) => {
        const meteo$ = this.service.getWeekMeteo(position.coords.latitude.toString(), position.coords.longitude.toString(), this.currentTime, this.nextWeekTime);
        const meteo: MeteoResponse = await lastValueFrom(meteo$);
        const ids: number[] = this.giveSlidingTimeId(meteo.hourly.time);
        for (const id of ids) {
          const temp: Week = {
            date: meteo.hourly.time[id],
            temperature: meteo.hourly.temperature_2m[id],
            humidite: meteo.hourly.relativehumidity_2m[id]
          };
          this.data.push(temp);
        }
        this.dataSource.data = this.data;
      });
    } else {
      const pos$ = this.service.getGeo(this.city);
      const geo: GeoJson[] = (await lastValueFrom(pos$)).results;
      if (geo.length !== 0) {
        const meteo$ = this.service.getWeekMeteo(geo[0].latitude.toString(), geo[0].longitude.toString(), this.currentTime, this.nextWeekTime);
        const meteo: MeteoResponse = await lastValueFrom(meteo$);
        const ids: number[] = this.giveSlidingTimeId(meteo.hourly.time);
        for (const id of ids) {
          const temp: Week = {
            date: meteo.hourly.time[id],
            temperature: meteo.hourly.temperature_2m[id],
            humidite: meteo.hourly.relativehumidity_2m[id]
          };
          this.data.push(temp);
        }
      }
      this.dataSource.data = this.data;
    }
  }

  ngAfterViewInit (): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter (value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  public giveSlidingTimeId (time: string[]): number[] {
    const ret: number[] = [];
    for (let i = 0; i < time.length; i++) {
      // we take only the weather weekly at 12 am
      if (time[i].split('T')[1].split(':')[0] === '12') {
        ret.push(i);
      }
    }
    return ret;
  }

  async redirectToList (): Promise<void> {
    await this.router.navigate(['/dashboard']);
  }
}
