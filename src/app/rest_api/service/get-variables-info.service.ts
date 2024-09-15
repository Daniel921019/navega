import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as configuration from '../../provider/global.service';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Response } from 'src/app/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class GetVariablesInfoService {

  private _storage: Storage | null = null;

  constructor(private http:HttpClient,private storage: Storage) {this.init()}

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    console.log('fakkas para verifica storage '+storage.create());
  }

  url=configuration.config.baseUrl+configuration.config.endpoint.fuzzyLogic;
  headers = new HttpHeaders().set('ngrok-skip-browser-warning', '1');

/* este metodo es reconsumido por un servivio el cual no tiene, ya que el objeto esta vacion
   pero se tiene respuesta del servicio  status 200
  getVariablesInfoService(locationCustomNameStation){
   console.log('quiero imprimir locationCustomNameStation '+ locationCustomNameStation);
    
   return this.http.get<Response>(this.url+"?estacion="+locationCustomNameStation, { headers: this.headers });
  }

  */
  //----> eliman la lentitud locationCustomNameStation="0000000001";
  locationCustomNameStation="0000000001";
  getVariablesInfoService(locationCustomNameStation) {
    const fullUrl = `${this.url}?estacion=${locationCustomNameStation}`;
    const headers = this.headers;
  
    // Simular o imprimir lo que se enviará en la solicitud
    console.log('URL de la solicitud:', fullUrl);
    console.log('Headers de la solicitud:', headers);
  
    // Realizar la solicitud HTTP
    return this.http.get<Response>(fullUrl, { headers: headers });
  }

}
