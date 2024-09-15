import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../rest_api/service/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  
  constructor(
    private route: Router,
    private userService: UserService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  forgotPassword(email){
    this.userService.verifyUserExist(email.value).subscribe(
      (res)=>{
        if(res.body["code"] == 1){
          this.userService.updatePassword(email.value).subscribe(
            (resP)=>{
              if(resP.body["code"] == 1){
                console.log("Ok")
                this.generateNotificacionUser("information-circle"," Consulta tu bandeja de entrada, ¡te enviamos un correo electrónico con tu información!","success");
              }
            },
            (errP)=>{
              console.log(errP)
            }
          );
        }
        if(res.body["code"] == 2){
          this.generateNotificacionUser("close-circle"," Error el usuario no se encuentra","warning");  
        }
        this.generateNotificacionUser("information-circle"," Consulta tu bandeja de entrada, ¡te enviamos un correo electrónico con tu información!","success");
      },
      (err)=>{
        this.generateNotificacionUser("close-circle", " ¡Comprueba tu conexión a Internet!", "error");
      }
    );
  }

  async generateNotificacionUser(icon: string, message: string, type: string) {
    const toast = await this.toastController.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: 'top',
      duration: 100,
      mode: "ios",
      cssClass: "toast-custom-class-" + type
    });
    toast.present();
  }

}
