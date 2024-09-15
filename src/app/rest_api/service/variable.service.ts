import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as configuration from '../../provider/global.service';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private _storage: Storage | null = null;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { this.init() }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
//daniel vargas modifica el medoto.DFV
  url = configuration.config.baseUrl+configuration.config.endpoint.variable;
  //console.log('imprimir valor df'+configuration.config.baseUrl+configuration.config.endpoint.variable);

  getInfoMeteorologicalVariable(variable,location,sensor){
    let postData = {
      "variable": "sea level",
      "location": location,
      "sensor": sensor
    }
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      
      return this.http.post(this.url + 'getMeterologicalVariable', postData, { headers: headers, observe: 'response' })
    
    }
    ));
  }
  getInfoMeteorologicalThermalSensationVariable(variable,location,sensor_1,sensor_2,unit){
    let postData = {
      "variable": variable,
      "location": location,
      "sensor_temperature": sensor_1,
      "sensor_humidity": sensor_2,
      "unit": unit
    }
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.post(this.url + 'getMeterologicalVariable', postData, { headers: headers, observe: 'response' })
    }
    ));
    console.log('postData varibale.servicio:-_'+postData);
  }

  getInfoMeteorologicalWindVariable(variable,location,sensor_1,sensor_2,unit){
    let postData = {
      "variable": variable,
      "location": location,
      "sensor_speed": sensor_1,
      "sensor_direction": sensor_2,
      "unit": unit
    }
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.post(this.url + 'getMeterologicalVariable', postData, { headers: headers, observe: 'response' })
    }
    ));
  }

}
