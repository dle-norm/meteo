import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from '../../shared/service/app.service';
import { lastValueFrom } from 'rxjs';
import { MeteoResponse } from 'src/app/shared/interface/meteo-json';
import { GeoJson } from 'src/app/shared/interface/geo-json';
import { Dashboard } from 'src/app/shared/interface/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['ville', 'temperature', 'humidite'];
  private cityList: string[] = ['Ajaccio', 'Marseille', 'Dijon', 'Toulouse', 'Bordeaux', 'Rennes', 'Nantes', 'Orléans', 'Lille', 'Strasbourg', 'Lyon', 'Paris', 'Rouen'];
  public dataSource = new MatTableDataSource<Dashboard>();
  public isLoading = true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private service: AppService) { }
  async ngOnInit () {
    await this.getAllMeteo();
    this.isLoading = false;
  }

  async getAllMeteo () {
    const data: Dashboard[] = [];
    for (let i = 0; i < this.cityList.length; i++) {
      const pos$ = this.service.getGeo(this.cityList[i]);
      const geo: GeoJson[] = (await lastValueFrom(pos$)).results;
      if (geo.length === 0) {
        continue;
      } else {
        const meteo$ = this.service.getMeteo(geo[0].latitude.toString(), geo[0].longitude.toString());
        const meteo: MeteoResponse = await lastValueFrom(meteo$);
        const temp: Dashboard = {
          ville: this.cityList[i],
          temperature: meteo.hourly.temperature_2m[0],
          humidite: meteo.hourly.relativehumidity_2m[0]
        };
        data.push(temp);
      }
    }
    this.dataSource.data = data;
  }

  redirectToDetails (ville: string) {

  }

  ngAfterViewInit (): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
