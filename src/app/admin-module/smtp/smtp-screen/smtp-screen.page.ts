import { Component, OnInit } from "@angular/core";
import { ServerSmtp } from "src/app/interfaces/interfaces";
import { AdminService } from "../../admin-service/admin.service";
import { AlertController, ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-smtp-screen",
  templateUrl: "./smtp-screen.page.html",
  styleUrls: ["./smtp-screen.page.scss"],
})
export class SmtpScreenPage implements OnInit {
  titulo: string = 'Servidor SMTP'
  href: string = '/admin-module'
  showPassword = false;
  passwordToggleIcon = "eye";
  myForm: FormGroup;
  isLoading: boolean = false


  serverSmtp: ServerSmtp = {
    service: "",
    servidor: "",
    puerto: 0,
    ssl: false,
    usuario: "",
    rejectUnauthorized: false,
    password: "",
  };

  constructor(
    private adminService: AdminService,
    private alertController: AlertController,
    private fb: FormBuilder,
    private snack: ToastController

  ) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      servidor: ['', Validators.required],
      puerto: ['', Validators.required],
      ssl: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(form: any) {
    if (form.valid) {
      this.alertUpdate()
    }
  }


  ngOnInit() {
    this.loadData()
  }

  loadData(){
    this.isLoading = true
    this.adminService.getServerSMTP().subscribe((res) => {
      this.serverSmtp = res;
    });
    this.isLoading = false
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }
  }

  async alertUpdate() {
    const alert = await this.alertController.create({
      header: "Navega Seguro",
      subHeader: "Actualizando datos",
      message: "Desea aplicar los cambios?",
      buttons: [
        "CANCELAR ",
        {
          text: "GUARDAR",
          handler: () => {
            this.updateSMTP();
          },
        },
      ],
    });
    await alert.present();
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

  updateSMTP() {
    this.isLoading = true
    this.adminService.updateSMTP(this.serverSmtp).subscribe(
      async (res: string) => {
        if(res){
          this.isLoading = false
          this.loadData()
          this.generateNotificacionUser(
            "close-circle",
            res,
            "success"
          );

        }
      },
      async err => {
        this.isLoading = false
        this.generateNotificacionUser(
          "close-circle",
          err.message,
          "error"
        );
      }
    );
  }

  testSMTP(emailTo){
    this.adminService.testSMTP(emailTo).subscribe(
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
    })
  }


  async generateNotificacionUser(
    icon: string,
    message: string,
    type: string
  ) {
    const toast = await this.snack.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: "bottom",
      duration: 5000,
      mode: "ios",
      cssClass: "toast-custom-class-" + type,
    });
    toast.present();
  }


}




