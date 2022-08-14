import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './component/accueil/accueil.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { WeatherWeekComponent } from './component/weather-week/weather-week.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'week/:city',
    component: WeatherWeekComponent
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'error',
    component: AccueilComponent
  },
  { path: '**', redirectTo: '/accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
