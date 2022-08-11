import { WeatherWeekComponent } from './weather-week.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  let component: WeatherWeekComponent;
  let fixture: ComponentFixture<WeatherWeekComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherWeekComponent],
      providers: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Init test : should create', () => {
    expect(component).toBeTruthy();
  });
});
