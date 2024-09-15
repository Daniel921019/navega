import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import * as configuration from "../../provider/global.service";
import { ApiKey, ServerSmtp, DataBase, User, Email } from "src/app/interfaces/interfaces";


@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}

  url = configuration.config.baseUrl + "/api/admin";
  headers = new HttpHeaders().set('ngrok-skip-browser-warning', '1');

  //Solicitar nombre de administrador con el ID
    getuserAdmin(id: string){
      return this.http.get<any>(
        `${this.url}/admin-user/${id}`, { headers: this.headers }
      );
    }

  // Peticiones para API
  getApisKeys() {
    return this.http.get(this.url + "/api-keys", { headers: this.headers });
  }
  
  getApiById(id: string) {
   
    return this.http.get<ApiKey>(
      `${this.url}/api-keys/${id}`,
      { headers: this.headers  }
    );
  }
  updateApi(id: string, apiKey: ApiKey) {
    return this.http.put(
      `${this.url}/api-keys/${id}`,
      apiKey, { headers: this.headers  }
    );
  }

  //Peticiones para servidor SMTP
  getServerSMTP() {
    return this.http.get<ServerSmtp>(
      `${this.url}/server_smtp`, { headers: this.headers  }
    );
  }

  updateSMTP(serverSmtp: ServerSmtp) {
    return this.http.put(
      `${this.url}/server_smtp`,
      serverSmtp, { headers: this.headers  }
    );
  }

  testSMTP(emailTo: string) {
    return this.http.post(
      `${this.url}/server_smtp/test_mail`, 
      { emailTo }, { headers: this.headers  }
    );
  }

  //Peticiones para database
  getAllDataBases() {
    return this.http.get(`${this.url}/database`, { headers: this.headers  });
  }

  getDataBaseById(id: string) {
    return this.http.get<DataBase>(
      `${this.url}/database/${id}`, { headers: this.headers  }
    );
  }

  updateDatabase(id: string, database: DataBase) {
    return this.http.put<DataBase>(
      `${this.url}/database/${id}`,
      database, { headers: this.headers  }
    );
  }

  //Peticiones para imagenes
  getAllImages() {
    return this.http.get(`${this.url}/images`, { headers: this.headers  });
  }

  updateImage(file) {
    const formData = new FormData();
    formData.append("file", file.selectedFile);
    formData.append("name", file.nombre_imagen);
    formData.append("id", file.id);
    return this.http.post(
      `${this.url}/upload-image`, 
      formData, { headers: this.headers }
    );
  }

  //Peticiones para correo
  getAllEmails() {
    return this.http.get<Email[]>(`${this.url}/correo`, { headers: this.headers  });
  }

  getCorreoId(id: string) {
    return this.http.get<Email>(
      `${this.url}/correo/${id}`, { headers: this.headers  }
    );
  }

  updateCorreo(id ,dataCorreo: any) {
    return this.http.put(`${this.url}/correo/${id}`, dataCorreo, { headers: this.headers  });
  }

  testMail(emailTo:string, id) {
    return this.http.post(`${this.url}/correo/test_mail/${id}`, { emailTo } , { headers: this.headers  });
  }


  //Peticiones para notificación
  getNotificationEvent(opcional: boolean) {
    return this.http.get<any>(`${this.url}/event-notification`, { params: { opcional } , headers: this.headers });
  }

  //Peticiones para usuarios
  getAllUser(cantusers, offset) {
    return this.http.get<any>(`${this.url}/users`, { params: {cantusers, offset }, headers: this.headers });
  }

  getUserById(id){
    return this.http.get<User>(`${this.url}/user/${id}`, { headers: this.headers  });
  }

  getUsersByletter(letter: string, offset: number, cantusers: number) {
    return this.http.get<any>(
      `${this.url}/users-letter`,{ params: {letter, offset, cantusers }, headers: this.headers }
    );
  }

  getFilterUser(nombre: any, mail: any){
    return this.http.get<any>(`${this.url}/filter-users`, { params: { nombre, mail }, headers: this.headers }) ;
  }

  UpdateUserById(id, user){
    return this.http.post(`${this.url}/update-user/${id}`, user,{ headers: this.headers  });
  }

  DeleteUserById(id){
    return this.http.delete(`${this.url}/delete-user/${id}`,{ headers: this.headers  });
  }

  // Peticiones Sensores 
  getSensorEvent(){
    return this.http.get<any>(`${this.url}/event_sensor`, { headers: this.headers  });
  }

}
