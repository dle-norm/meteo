import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from '../../shared/service/app.service';
import { lastValueFrom } from 'rxjs';
import { MeteoResponse } from 'src/app/shared/interface/meteo-json';
import { GeoJson } from 'src/app/shared/interface/geo-json';
import { Dashboard } from 'src/app/shared/interface/dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['ville', 'temperature', 'humidite', 'details'];
  private cityList: string[] = ['Ajaccio', 'Marseille', 'Dijon', 'Toulouse', 'Bordeaux', 'Rennes', 'Nantes', 'Orléans', 'Lille', 'Strasbourg', 'Lyon', 'Paris', 'Rouen'];
  public dataSource = new MatTableDataSource<Dashboard>();
  public isLoading = true;
  public currentTime: string = new Date().toISOString();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private service: AppService, private router: Router) { }
  async ngOnInit () {
    await this.getAllMeteo();
    this.isLoading = false;
  }

  async getAllMeteo (): Promise<void> {
    const data: Dashboard[] = [];
    for (let i = 0; i < this.cityList.length; i++) {
      const pos$ = this.service.getGeo(this.cityList[i]);
      const geo: GeoJson[] = (await lastValueFrom(pos$)).results;
      if (geo.length === 0) {
        continue;
      } else {
        const meteo$ = this.service.getMeteo(geo[0].latitude.toString(), geo[0].longitude.toString());
        const meteo: MeteoResponse = await lastValueFrom(meteo$);
        const id: number = this.giveCurrentTimeId(meteo.hourly.time);
        const temp: Dashboard = {
          ville: this.cityList[i],
          temperature: meteo.hourly.temperature_2m[id],
          humidite: meteo.hourly.relativehumidity_2m[id]
        };
        data.push(temp);
      }
    }
    this.dataSource.data = data;
  }

  async redirectToDetails (city: string): Promise<void> {
    await this.router.navigate([`/week/${city}`]);
  }

  ngAfterViewInit (): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter (value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  public giveCurrentTimeId (time: string[]): number {
    for (let i = 0; i < time.length; i++) {
      if (time[i].split('T')[1].split(':')[0] === this.currentTime.split('T')[1].split(':')[0]) {
        return i;
      }
    }
  }
}
