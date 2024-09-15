import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin-service/admin.service";
import { ActivatedRoute } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";
import { User } from "src/app/interfaces/interfaces";
import { Platform } from '@ionic/angular';


@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.page.html",
  styleUrls: ["./user-profile.page.scss"],
})

export class UserProfilePage implements OnInit {
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private platform: Platform,
    private snack: ToastController
  ) {}
  isLoading: boolean = false
  nombre_usuario = "";
  titulo = "Perfil Usuario";
  href = "admin-module/user";
  typeUsers: any = [
    { id_tipo_usuario: 1, tipo_usuario: "Administrador" },
    { id_tipo_usuario: 2, tipo_usuario: "Usuario" },
  ];
  userId: Number;
  user: User = {
    id_usuario: 0,
    correo_electronico: "",
    nombre: "",
    apellido: "",
    id_categoria_usuario: 0,
    id_tipo_usuario: 0,
    estado_usuario: false,
    usuario_password: ""
  };

  ngOnInit() {
   this.loadData()
  }


  loadData(){
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get("id_usuario")) {
        this.adminService
          .getUserById(paramMap.get("id_usuario"))
          .subscribe((res) => {
            console.log(res[0].nombre);
            this.user = res[0];
            this.userId = Number(paramMap.get("id_usuario"));
          });
      }
    });
  }

  async updateUser() {
    this.isLoading = true
    try {
      this.user.usuario_password = this.user.id_tipo_usuario === 2 ? null : this.user.usuario_password;
      const res = await this.adminService.UpdateUserById(this.userId, this.user).toPromise();
      console.log(res); 
      const message = res['message']; 
      this.isLoading = false
      const toast = await this.snack.create({
        message: '<ion-icon name="' + "people-circle-outline" + '"></ion-icon>' + message,
        duration: 5000,
        mode:'ios',
        cssClass: res['code'] === '1' ? 'toast-custom-class-res' : 'color-toast-danger'
      });
       
      toast.present();
    } catch (err) {
      console.log(err);
    }
  }
  
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Cambiando Contraseña',
      inputs: [
        {
          name: 'password',
          type: 'text',
          id: 'name2-id',
          placeholder: 'Contraseña',
       //   value: this.user.usuario_password,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            if (this.validatePassword(data.password)) {
              this.showPasswordAlert(data.password)
              this.user.usuario_password = data.password
              this.updateUser();
            } else {
              this.showValidationAlert();
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  validatePassword(password: string): boolean {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
  }
  
  async showPasswordAlert(password: string) {
    const alert = await this.alertController.create({
      header: 'Contraseña ingresada',
      message: `La contraseña ingresada es: ${password}`,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  async showValidationAlert() {
    const alert = await this.alertController.create({
      header: 'Contraseña inválida',
      message: 'La contraseña debe contener al menos una letra mayúscula',
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
