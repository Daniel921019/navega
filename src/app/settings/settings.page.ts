import { Component, ViewChild } from "@angular/core";
import { NotificationService } from "../rest_api/service/notification.service";
import { LanguageService } from "../rest_api/service/language.service";
import { UserService } from "../rest_api/service/user.service";
import { UnitMeasurementService } from "../rest_api/service/unit-measurement.service";
import { AlertController, ToastController } from "@ionic/angular";
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GetPreferencesService } from "../rest_api/service/get-preferences.service";
import { MenuPage } from "../menu/menu.page";
import { AdminService } from "../admin-module/admin-service/admin.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-settings",
  templateUrl: "settings.page.html",
  styleUrls: ["settings.page.scss"],
})
export class SettingsPage {
  selectedWindSpeed: any = 1
  selectedThermalSensation: any = 5
  languages: any = [];
  windSpeeds = [
    { id_unidad_medida: 1, unidad_medida: 'nudos', id_variable: 2 },
    { id_unidad_medida: 2, unidad_medida: 'm/s', id_variable: 2 },
  ];
  thermalSensations = [
    {id_unidad_medida: 5, unidad_medida: "Fahrenheit", id_variable: 8},
    {id_unidad_medida: 6, unidad_medida: "Celsius", id_variable: 8},
    {id_unidad_medida: 7, unidad_medida: "Kelvin", id_variable: 8}
  ];
  email: string;
  public configForm: FormGroup;

  //Inicializador form
  excelente_notificacion = false;
  alerta_notificacion = false;
  peligro_notificacion = false;
  windSpeed = '';
  thermalSensation = '';
  emailValidator : any;
  adminValidator = false;

  constructor(
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private userService: UserService,
    private unitMeasurementService: UnitMeasurementService,
    private router: Router,
    public toastController: ToastController,
    private PreferenceService: GetPreferencesService,
    private storage: Storage,
    private alertController: AlertController,
    private adminService: AdminService, 
  ) {
  }
  @ViewChild(MenuPage) menuPage: MenuPage;
  async dataInit() {
    const res1 = await this.PreferenceService.read("excelente_notificacion");
    this.excelente_notificacion = res1.value === 'true'
    const res2 =await this.PreferenceService.read("alerta_notificacion")
    this.alerta_notificacion = res2.value === 'true'
    const res3 =await this.PreferenceService.read("peligro_notificacion")
    this.peligro_notificacion = res3.value === 'true'
    const res4 = await this.PreferenceService.read("thermalSensation")
    this.selectedThermalSensation = Number(res4.value)
    const res5 = await this.PreferenceService.read("windSpeed")
    this.selectedWindSpeed = Number(res5.value)
    this.validatorEmail()
    
  }
 
  ngOnInit() {
    this.dataInit();
  }

  async validatorEmail(){
    const admin = localStorage.getItem("admin");
    if (admin == "A") {
      this.adminValidator = false;
    } else {
      this.adminValidator = true;
    }
  }

  async updateUser() {
    await this.PreferenceService.update(
      "excelente_notificacion",
      this.excelente_notificacion
    );
    await this.PreferenceService.update(
      "alerta_notificacion",
      this.alerta_notificacion
    );
    await this.PreferenceService.update(
      "peligro_notificacion",
      this.peligro_notificacion
    );
    await this.PreferenceService.update(
      "thermalSensation",
      this.selectedThermalSensation
    );
    await this.PreferenceService.update(
      "windSpeed",
      this.selectedWindSpeed
    );
    await this.generateNotificacionUser('checkmark-circle', 'Preferencia actualizada correctamente', 'success')
  }

  logOut(){
    this.storage.remove('email').then(() => {
      console.log('email removed');
      this.emailValidator = false
    });
  }

  async generateNotificacionUser(icon: string, message: string, type: string) {
    const toast = await this.toastController.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: "top",
      duration: 5000,
      mode: "ios",
      cssClass: "toast-custom-class-" + type,
    });
    toast.present();
  }


  async validatorDeleteAccount() {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar su cuenta?',
      subHeader: "Ingrese 'eliminar'",
      message: 'Tenga en cuenta que esta acción no se puede deshacer.',
      inputs: [
        {
          name: 'confirmationWord',
          type: 'text',
          id: 'confirmation-id',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            console.log('Operación cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            if (data.confirmationWord.toLowerCase() === 'eliminar') {
              try {
                console.log(this.storage.get('email'))
                var emaiUser = await this.storage.get('email')
                console.log(await this.storage.get('email'));  
                this.DeleteUser(await this.storage.get('email'));
                 
                this.router.navigate(['/welcome'], { replaceUrl: true }); 
                localStorage.removeItem('id_user');
                localStorage.removeItem('admin');
                this.storage.remove('email');
              } catch (error) {
                await this.generateNotificacionUser('warning-outline', error, 'warning');
              }
            } else {
              await this.generateNotificacionUser('checkmark-circle', 'Confirmación inválida.', 'error');
            }
          }
        }
      ]
    });
    await alert.present();
  }
  

  DeleteUser(emaiUser) {
    this.userService.DeleteUserByEmail( emaiUser ).subscribe(
      (res) => {
        this.generateNotificacionUser('warning-outline', 'Cuenta eliminada...', 'warning');
        console.log(res)
      },
      (error) => {
        console.error(error);
      }
    );
  }



}
