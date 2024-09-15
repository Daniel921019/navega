import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as configuration from '../../provider/global.service';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryUserService {

  private _storage: Storage | null = null;

  constructor(
    private http: HttpClient,
    private storage: Storage

  ) { this.init() }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  url=configuration.config.baseUrl+configuration.config.endpoint.category_user;
  
  getAllCategoryUser() {
    var headers = new HttpHeaders().set('ngrok-skip-browser-warning', '1');
    return from(this.storage.get('token')).pipe(
      mergeMap(token => {
       // headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url + '/getAllCategoryUser', { headers: headers });
      })
    );
  }
}
