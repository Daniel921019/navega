import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as configuration from '../../provider/global.service';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private _storage: Storage | null = null;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { this.init() }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  url = configuration.config.baseUrl + configuration.config.endpoint.newsletter;

  getNewslettersInfo(){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '1');
      return this.http.get(this.url + 'getNewslettersInfo', { headers: headers, observe: 'response' })
    }
    ));
  }

/*
  getAllNewsletter(){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.get(this.url + 'getAllNewsletter', { headers: headers, observe: 'response' })
    }
    ));
  }

  getRecentNewsletter(){
    return from(this.storage.get('token'))
    .pipe(mergeMap(authorization => {
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + authorization);
      return this.http.get(this.url + 'getRecentNewsletter', { headers: headers, observe: 'response' })
    }
    ));
  }
*/
}