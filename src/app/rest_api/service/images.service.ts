import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { config } from "../../provider/global.service";
@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  url= config.baseUrl+"/api/admin"
  headers = new HttpHeaders().set('ngrok-skip-browser-warning', '1');

  constructor(private http: HttpClient) { }

  getImage(id: number) {
    console.log(this.http.get(`${this.url}/image/${id}`, { headers: this.headers }))
    return this.http.get(`${this.url}/image/${id}`, { headers: this.headers });
  }
}
