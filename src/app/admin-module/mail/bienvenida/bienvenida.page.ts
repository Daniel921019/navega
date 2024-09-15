import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/admin-module/admin-service/admin.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: 'bienvenida.page.html',
  styleUrls: ['bienvenida.page.scss']
})
export class BienvenidaPage implements OnInit {
  titulo: string = 'Plantilla de correo electronico'
  href: string = '/admin-module/correo'

  dataCorreo: any = []
  res_email_id: Number
  contenidoHTML: any;

  constructor(
    private sanitizer: DomSanitizer,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public toastController: ToastController
  ) { 
   
  }

  ngOnInit(){
    this.loadData()
  }

  loadData(){
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get("id_correo")) {
        this.adminService
          .getCorreoId(paramMap.get("id_correo"))
          .subscribe((res) => {
            this.dataCorreo = res;
            this.res_email_id = Number(res.id_correo);
            this.contenidoHTML = this.sanitizer.bypassSecurityTrustHtml(this.dataCorreo.contenido_html);
          });
      }
    });
  }

  
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Prueba Mail',
      inputs: [
        {
          name: 'emailTo',
          type: 'email',
          id: 'name2-id',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (res) => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.testSMTP(data.emailTo);
          }
        }
      ]
    });

    await alert.present();
  }

  
  testSMTP(emailTo) {
    this.adminService.testMail(emailTo, this.res_email_id).subscribe(
      (res) => {
        this.generateNotificacionUser(
          "close-circle",
          res['message'],
          res['message'] === 'Correo electrónico enviado con éxito' ? "success" : "error"
        );
      },
      (error) => {
        this.generateNotificacionUser("close-circle", error.toString(), "error");
        console.log(error);
      }
    );
  }


  async generateNotificacionUser(
    icon: string,
    message: string,
    type: string
  ) {
    const toast = await this.toastController.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: "bottom",
      duration: 5000,
      mode: "ios",
      cssClass: "toast-custom-class-" + type,
    });
    toast.present();
  }

}
