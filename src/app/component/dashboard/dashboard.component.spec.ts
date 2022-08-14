import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppService } from '../../shared/service/app.service';
import { DashboardComponent } from './dashboard.component';

describe('AppComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockDate: string[] = ['2022-08-11T21:00', '2022-08-11T22:00', '2022-08-11T23:00', '2022-08-12T00:00', '2022-08-12T01:00', '2022-08-12T02:00', '2022-08-12T03:00', '2022-08-12T04:00', '2022-08-12T05:00', '2022-08-12T06:00', '2022-08-12T07:00'];
  ;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{
        provide: AppService,
        useValue: {}
      },
      {
        provide: Router,
        useValue: {}
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Init test : should create', () => {
    expect(component).toBeTruthy();
  });

  it('Time test : should give id of the current time', () => {
    // todo fix 2 hours jet lag
    component.currentTime = '2022-08-11T21:52';
    expect(component.giveCurrentTimeId(mockDate)).toBe(2);
  });
});
