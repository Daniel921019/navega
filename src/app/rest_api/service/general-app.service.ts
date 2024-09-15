import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as configuration from '../../provider/global.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralAppService {

  constructor(
    private http: HttpClient
  ) { }

  url = configuration.config.baseUrl + configuration.config.endpoint.app;
  getAuthorizationInitial() {
    let postData = {
      "source": "app"
    }
    return this.http.post(this.url + 'initial', postData, {observe: 'response'});
  }

  getMenuInitial() {
    return this.http.get(this.url + 'welcome');
}
}
