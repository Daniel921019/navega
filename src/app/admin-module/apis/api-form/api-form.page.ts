import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin-service/admin.service";
import { ActivatedRoute } from "@angular/router";
import { ApiKey } from "src/app/interfaces/interfaces";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: "app-api-form",
  templateUrl: "./api-form.page.html",
  styleUrls: ["./api-form.page.scss"],
})
export class ApiFormPage implements OnInit {

  titulo: string = 'Formulario de apis'
  href: string = '/admin-module/api-key-screen'
  res_api_id?;
  apiKeyRespuesta: ApiKey = {
    id_api: "",
    nombre_api: "",
    api_key: "",
    status_api: "",
  };
  myForm: FormGroup; 


  default_state = false;
  showPassword = false;
  passwordToggleIcon = "eye";
  isLoading: boolean = false
  idApi = ''

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private fb: FormBuilder,
    private snack: ToastController,
    private route: Router,
    private loadcontrol: LoadingController


  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.idApi = paramMap.get("id_api")
    })
  }

  createForm() {
    this.myForm = this.fb.group({
      api_key: ['', Validators.required],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }
  }

  ngOnInit() {
    this.loadData()
  }

  ngOnChange() {
    this.loadData();
  }

  loadData(){
    this.isLoading = true
      if (this.idApi != '') {
        this.adminService
          .getApiById(this.idApi)
          .subscribe((res) => {
            this.apiKeyRespuesta = res;
            this.res_api_id = res.id_api;
            this.setApiStatus();
            this.isLoading = false
          });
      }
  }

  submit(form: any) {
    if (form.valid) {
      this.presentAlert()
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Navega Seguro",
      subHeader: "Actualizando datos",
      message: "Desea aplicar los cambios?",
      buttons: [
        "Cancel ",
        {
          text: "OK",
          handler: () => {
            this.updateApi();
          },
        },
      ],
    });
    await alert.present();
  }

  setApiStatus() {
    if (this.apiKeyRespuesta.status_api == "200") {
      this.default_state = true;
    } else {
      this.default_state = false;
    }
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadcontrol.create({
      //spinner: null,
      duration: 10000,
      message: 'Consultando ..',
      //translucent: true,
      //cssClass: 'custom-class custom-loading',
      //backdropDismiss: true
    });
    await loading.present();
  }

  updateApi() {
    this.presentLoadingWithOptions();
    this.adminService
      .updateApi(this.res_api_id, this.apiKeyRespuesta)
      .subscribe(
        async (res: any) => {
          if(res){

            this.isLoading = false
            this.generateNotificacionUser(
              "close-circle",
              res.mesagge,
              "success"
            );
            this.loadcontrol.dismiss();
          }
        },
        async err => {
          console.log('err',err)
          this.isLoading = false
          this.generateNotificacionUser(
            "close-circle",
            err.message,
            "error"
          );
        }
      );
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
