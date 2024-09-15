import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as configuration from "../../provider/global.service";
import { Storage } from "@ionic/storage-angular";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _storage: Storage | null = null;
  email: string;

  
  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  url = configuration.config.baseUrl + configuration.config.endpoint.user;
  urlDelete = configuration.config.baseUrl + "/api/admin";
  async update(key: string, value: any) {
    await Preferences.set({ key, value });
  }

  registerNewUser(
    email,
    first_name,
    last_name,
    school_grade,
    category_user,
    password,
    confirm_password,
    accept_term_conditions
  ) {
    let postData = {
      correo: email,
      nombre: first_name,
      apellido: last_name,
      id_grado_escolaridad: school_grade,
      id_categoria_usuario: category_user,
      id_tipo_usuario: 1,
      usuario_password: password,
      acepto_terminos_condiciones: accept_term_conditions,
      estado_usuario: true,
    };
    return from(this.storage.get("token")).pipe(
      mergeMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        });

        return this.http.post(this.url + "createUser", postData, {
          headers: headers,
          observe: "response",
        });
      })
    );
  }

  registerUser(
    email, first_name, last_name, school_grade, category_user, accept_term_conditions
  ){
    let postData = {
      correo: email,
      nombre: first_name,
      apellido: last_name,
      id_grado_escolaridad: school_grade,
      id_categoria_usuario: category_user,
      acepto_terminos_condiciones: accept_term_conditions,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + 'create-new-user', postData, {
      headers: headers,
      observe: 'response'
    });
  }
  


  signIn(email, password) {
    let postData = {
      "email": email,
      "password": password,
    };
    localStorage.getItem('token')
    // return from(this.storage.get('token')).pipe(
    //   mergeMap((token) => {
    //     console.log('token', token)
    //     const headers = new HttpHeaders().append(
    //       'Authorization',
    //       'Bearer ' + token
    //     );
    //     return this.http.post(this.url + 'signIn', postData, {
    //       headers: headers,
    //       observe: "response",
    //     });
    //   })
    // );
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.post(this.url + 'signIn', postData, {
      headers: headers,
      observe: "response",
    });
  }

  verifyUserExist(email) {
    let postData = {
      email: email,
    };
    return from(this.storage.get("token")).pipe(
      mergeMap((token) => {
        const headers = new HttpHeaders().append(
          "Authorization",
          "Bearer " + token
        );
        return this.http.post(this.url + "verifyUser", postData, {
          headers: headers,
          observe: "response",
        });
      })
    );
  }

  updatePassword(email) {
    let postData = {
      email: email,
    };
    return from(this.storage.get("token")).pipe(
      mergeMap((token) => {
        const headers = new HttpHeaders().append(
          "Authorization",
          "Bearer " + token
        );
        return this.http.post(this.url + "recoverPassword", postData, {
          headers: headers,
          observe: "response",
        });
      })
    );
  }

  updateUserType(email, type) {
    let postData = {
      email: email,
      type: type,
    };
    return from(this.storage.get("token")).pipe(
      mergeMap((authorization) => {
        const headers = new HttpHeaders().append(
          "Authorization",
          "Bearer " + authorization
        );
        return this.http.post(this.url + "updateUserType", postData, {
          headers: headers,
          observe: "response",
        });
      })
    );
  }

  getUserByConfiguration(email) {
    let postData = {
      email: email,
    };
    return from(this.storage.get("token")).pipe(
      mergeMap((authorization) => {
        const headers = new HttpHeaders().append(
          "Authorization",
          "Bearer " + authorization
        );
        return this.http.post(this.url + "getUserByConfiguration", postData, {
          headers: headers,
          observe: "response",
        });
      })
    );
  }

  getUserUnitConfiguration(email, id_variable) {
    let postData = {
      email: email,
      id_variable: id_variable,
    };
    return from(this.storage.get("token")).pipe(
      mergeMap((authorization) => {
        const headers = new HttpHeaders().append(
          "Authorization",
          "Bearer " + authorization
        );
        return this.http.post(this.url + "getAllConfigurationUnit", postData, {
          headers: headers,
          observe: "response",
        });
      })
    );
  }

  updateUserConfiguration(
    unit_measurement_speed,
    unit_measurement_sensation,
    excellent_notification,
    warning_notification,
    danger_notification
  ) {
    this.update("excelente_notificacion", excellent_notification);
    this.update("alerta_notificacion", warning_notification);
    this.update("peligro_notificacion", danger_notification);
    return "Cambiado"
  }

  DeleteUserByEmail(email) {
    const requestBody = { email: email };
    const requestOptions = {
      body: requestBody 
    };
  
    return this.http.delete<any>(`${this.urlDelete}/delete-user-email`, requestOptions);
  }



}
