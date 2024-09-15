import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as configuration from "../../provider/global.service";
import { Storage } from "@ionic/storage-angular";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private _storage: Storage | null = null;
  email: string;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async create(key: string, value: any) {
    await Preferences.set({ key, value });
  }

  async readSetting(key: string) {
    return await Preferences.get({ key });
  }

  async update(key: string, value: any) {
    await Preferences.set({ key, value });
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  url =
    configuration.config.baseUrl + configuration.config.endpoint.notification;

  getNotifications(name_station, id_variable) {
    let postData = {
      id_variable: id_variable,
      name_station: name_station,
    };
    return this.http.post(this.url + "getNotifications", postData);
  }

  getUvIndex(latitud_estacion, longitud_estacion, locationCustomNameStation) {
    let postData = {
      latitud_estacion: latitud_estacion,
      longitud_estacion: longitud_estacion,
      nombre_estacion: locationCustomNameStation,
    };
    return this.http.post(this.url + "getUvIndex", postData);
  }

  qualifyNotification(id_variable, calification) {
    return from(this.storage.get("email")).pipe(
      mergeMap((email) => {
        let postData = {
          id_notification: id_variable,
          email: email,
          calification: calification,
        };
        return this.http.post(this.url + "insertQualifyNotification", postData);
      })
    );
  }

  updateNotificationsConfigured(
    excellent_notification,
    warning_notification,
    danger_notification,
    id_configuration
  ) {
    let postData = {
      latitud_estacion: this.update(
        "excelente_notificacion",
        excellent_notification
      ),
      longitud_estacion: this.update(
        "alerta_notificacion",
        warning_notification
      ),
      nombre_estacion: this.update("peligro_notificacion", danger_notification),
      id_configuration: id_configuration,
    };
    return of(postData);
  }
}
