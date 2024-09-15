import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from '../rest_api/service/user.service';
import { GeneralAppService } from '../rest_api/service/general-app.service';
import { Storage } from '@ionic/storage-angular';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
//Control de Formularios Jose Pinto - 29 de marzo 2022
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../rest_api/service/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private _storage: Storage | null = null;
  public loginForm: FormGroup;

  constructor(
    private route: Router,
    private userService: UserService,
    private generalAppService: GeneralAppService,
    //private storage: Storage,
    private localNotifications: LocalNotifications,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private authService: AuthServiceService,
  ) {
    this.inicializarFormulario();
   }

  async ngOnInit() {
    //this._storage = await this.storage.create();
    this.generalAppService.getAuthorizationInitial().subscribe(async res => {
      //await this._storage.set('token', res.headers.get('authorization'));
      localStorage.setItem('token', res.headers.get('authorization'))
    });
  }



  inicializarFormulario() {
    this.loginForm = this.formBuilder.group({
      'email':[null, Validators.compose([Validators.required, Validators.email])],
      'password':[null, Validators.compose([Validators.required])]
    });
  }

  signIn(email, password) {
    this.localNotifications.schedule({
      id:1,
      title: 'Notificacion',
      text: 'Mi texto de prueba',
      data: {page:'Mensaje oculto'},
      trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND}
    });
    this.userService.signIn(email.value, password.value).subscribe(
      async (res: any) => {
        if(res.body.type_user == "Administrador"){
          localStorage.setItem('admin', 'A')
          localStorage.setItem('id_user', res.body.id_user)
        }
        if (res.body["code"] == 1) {
          localStorage.setItem('authorization', res.headers.get('authorization'))
          this.authService.saveEmail(email.value);
          this.generateNotificacionUser("information-circle", " ¡Genial que hayas vuelto!", "success", true, res.body.type_user);
        } else {
          this.generateNotificacionUser("close-circle", " El correo electrónico o la contraseña son incorrectos.", "error", false, null);
        }
      },
      (err) => {
        console.log('err',err)
        this.generateNotificacionUser("close-circle", " ¡Comprueba tu conexión a Internet!", "error", false, null);
      }
    );
  }

  async generateNotificacionUser(icon: string, message: string, type: string, status: boolean, user_type: string) {
    const toast = await this.toastController.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: 'top',
      duration:1000,
      mode: "ios",
      cssClass: "toast-custom-class-" + type
    });
    toast.present();
    toast.onDidDismiss().then(
      (val) => {
        if (status && user_type != 'Administrador') {
          this.route.navigate(['/tutorial']);
        } else if (status && user_type == 'Administrador') {
          this.navController.pop();
          this.route.navigate(['menu'])
          
        }
      } 
    )
  }

  generateNotification() {
    this.localNotifications.schedule({
      id:1,
      title: 'Notificacion',
      text: 'Mi texto de prueba',
      data: {page:'Mensaje oculto'},
      trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND}
    });

  }

}
