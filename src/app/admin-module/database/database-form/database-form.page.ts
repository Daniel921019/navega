import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin-service/admin.service";
import { ActivatedRoute } from "@angular/router";
import { DataBase } from "src/app/interfaces/interfaces";
import { AlertController, ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-database-form",
  templateUrl: "./database-form.page.html",
  styleUrls: ["./database-form.page.scss"],
})
export class DatabaseFormPage implements OnInit {
  isListVisible = false;
  isLoading: boolean = false

  resDatabaseId: any
  titulo: string = 'Configuración'
  href: string = '/admin-module/database-view'
  resDatabase: DataBase = {
    id_database: 0,
    nombre_database: "",
    descripcion_database: "",
    estado_database: 0,
    puerto_database: 0,
    usuario_database: "",
    host_database: "",
    password_database: "",
    trusted_connection: false,
    trusted_server: false,
    enable_airth_host: false,
    encript_database: false,
    mensaje: "",
  };
  myForm: FormGroup; 

  showPassword = false;
  passwordToggleIcon = "eye";

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private fb: FormBuilder,
    private snack: ToastController

  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    this.isLoading = true 
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get("id_database")) {
        this.adminService
          .getDataBaseById(paramMap.get("id_database"))
          .subscribe((res) => {
            this.resDatabase = res;
            this.resDatabaseId = paramMap.get("id_database")
          });
      }
    });
    this.isLoading = false 

  }

  toggleList() {
    this.isListVisible = !this.isListVisible;
  }

  createForm() {
    this.myForm = this.fb.group({
      nombre_database: ['', Validators.required],
      puerto_database: ['', Validators.required],
      host_database: ['', Validators.required],
      usuario_database: ['', Validators.required],
      password_database: ['', Validators.required]
    });
  }

  submit(form: any) {
    if (form.valid) {
      this.presentAlert()
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
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
            this.updateDatabase();
          },
        },
      ],
    });
    await alert.present();
  }

  updateDatabase() {
    this.isLoading = true
    this.adminService
      .updateDatabase(this.resDatabaseId, this.resDatabase)
      .subscribe(
        async (res : any) =>{
          this.isLoading = false
          this.loadData()
          
          this.generateNotificacionUser(
            "close-circle",
            'Se ha realizado la actualización exitosamente',
            "success"
          );
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

    //location.reload();
  }


}
