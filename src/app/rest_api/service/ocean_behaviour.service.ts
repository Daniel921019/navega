import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as configuration from '../../provider/global.service';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OceanBehaviorService {

  private _storage: Storage | null = null;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { this.init(); }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  url = configuration.config.baseUrl + configuration.config.endpoint.ocean_behaviour;

  getAllStations(city_id : string){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const params = new HttpParams().append('city_id', city_id);
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.get(this.url + 'getAllStations', { headers: headers, observe: 'response', params: params });
    }
    ));
  }

  getSensorData(sensor_id : string, station_id : string, month : string, max_days : string, year : string){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const params = new HttpParams()
        .append('sensor_id', sensor_id)
        .append('station_id', station_id)
        .append('month', month)
        .append('max_days', max_days)
        .append('year', year);
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.get(this.url + 'getSensorData', { headers: headers, observe: 'response', params: params });
    }
    ));
  }

  getWindData(dir_sensor_id : string, speed_sensor_id : string, station_id : string, month : string, max_days : string, year : string){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const params = new HttpParams()
        .append('dir_sensor_id', dir_sensor_id)
        .append('speed_sensor_id', speed_sensor_id)
        .append('station_id', station_id)
        .append('month', month)
        .append('max_days', max_days)
        .append('year', year);
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.get(this.url + 'getWindData', { headers: headers, observe: 'response', params: params });
    }
    ));
  }

  getStatistics(sensor_id : string, station_id : string, month : string, max_days : string, year : string){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const params = new HttpParams()
        .append('sensor_id', sensor_id)
        .append('station_id', station_id)
        .append('month', month)
        .append('max_days', max_days)
        .append('year', year);
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.get(this.url + 'getStatistics', { headers: headers, observe: 'response', params: params });
    }
    ));
  }

  getYearsAndMonths(){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.get(this.url + 'getYearsAndMonths', { headers: headers, observe: 'response' });
    }
    ));
  }

  getAllCities(){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.get(this.url + 'getAllCities', { headers: headers, observe: 'response' });
    }
    ));
  }

  getSensorId(sensor_code : string){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const params = new HttpParams().append('sensor_code', sensor_code);
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.get(this.url + 'getSensorId', { headers: headers, observe: 'response', params: params });
    }
    ));
  }
}