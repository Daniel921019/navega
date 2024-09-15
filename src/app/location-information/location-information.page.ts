import * as moment from 'moment-timezone';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VariableService } from '../rest_api/service/variable.service';
import { NotificationService } from '../rest_api/service/notification.service';
import { UserService } from '../rest_api/service/user.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { Storage } from '@ionic/storage-angular';
import { GetPreferencesService } from '../rest_api/service/get-preferences.service';

@Component({
  selector: 'app-location-information',
  templateUrl: './location-information.page.html',
  styleUrls: ['./location-information.page.scss'],
})
export class LocationInformationPage implements AfterViewInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  locationNameCity: String;
  locationId: String;
  locationNameStation: String;
  locationCustomNameStation: String;
  latitud_estacion: String;
  longitud_estacion: String;
  variableNoData: String = 'N/A';
  notificationTime: String = "N/A";

  precipitationValue: String = '-';
  precipitationDescription: String = 'Sin Lluvias';
  precipitationColor: String = '#92f252';
  precipitationStatus: String = 'Visibilidad optima';
  precipitationNotification: String = 'Notificación';
  precipitationDate: String = "N/A";

  atmosphericValue: String = '-';
  atmosphericGradient: String = 'gradiente';
  atmosphericStatus: String = 'Estado de la atmósfera';
  atmosphericDate: String = "N/A";

  thermalValue: String = '-';
  thermalDescription: String = 'Sensación de calor';
  thermalColor: String = '#FFBC2F';
  thermalUnits: String = '°C';
  thermalStatus: String = 'Estado del calor';
  thermalNotification: String = "Notification";
  thermalDate: String = "N/A";

  uvValue: String = '0';
  uvUnit: String = 'UV';
  uvStatus: String = 'Índice UV';
  uvDate: String = "N/A";

  lineChart: any;
  seaLevelDate: String = "";

  windNotification: String;
  windSpeed: String = '-';
  windDirection: String = 'Sur';
  windDescription: String = 'Velocidad baja';
  windUnit: String = 'm/s';
  windStatus: String = 'Buen clima';
  windColor: String = '#92f252';
  windDirectionStatus: String = "";
  windDate: String = "N/A";

  private _storage: Storage | null = null;
  email: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private variableService: VariableService,
    private notificationService: NotificationService,
    public toastController: ToastController,
    private userService: UserService,
    private storage: Storage,
    public loadingController: LoadingController,
    private PreferenceService: GetPreferencesService
  ) {

  }
  ngOnInit(){
    this.getUnitThermal()
    this.getUnitWind()
  }

  async ngAfterViewInit() {
    this._storage = await this.storage.create();
    this.email = await this._storage.get('email');
    this.locationId = this.activatedRoute.snapshot.paramMap.get('locationId');
    this.locationNameStation = this.activatedRoute.snapshot.paramMap.get('locationNameStation');
    this.locationNameCity = this.activatedRoute.snapshot.paramMap.get('locationNameCity');
    this.locationCustomNameStation = this.activatedRoute.snapshot.paramMap.get('locationCustomNameStation');
    this.latitud_estacion = this.activatedRoute.snapshot.paramMap.get('latitud_estacion');
    this.longitud_estacion = this.activatedRoute.snapshot.paramMap.get('longitud_estacion');
    this.presentLoadingWithOptions();
    this.getUvIndex();
    this.getPrecipitationInformation();
    this.getAtmosphericPressureInformation();
    this.getThermalSensationInformation();
    this.getWindSpeedInformation();
    this.getWindDirectionInformation();
    this.getThermalSensationInformation();
    this.getSeaLevelInformation(); 
    this.getWindLevelInformation();
  }

  getPrecipitationInformation() {
    this.notificationService.getNotifications(this.locationId, 4).subscribe(
      (res: any[]) => {
        if (res.length > 0) {
          this.precipitationDate = moment(res[0]["fecha_notificacion"]).tz("America/Bogota").format("DD/MM/YYYY LT");
          this.precipitationNotification = res[0]["id_notificacion"];
          this.precipitationValue = res[0]["valor_variable_notificacion"];
          this.precipitationDescription = res[0]["mensaje_notificacion"];
          this.precipitationColor = res[0]["color_notificacion"];
          this.precipitationStatus = res[0]["titulo_notificacion"];
        }
      },
      (err) => console.log(err)
    );
  }

  getAtmosphericPressureInformation() {
    this.notificationService.getNotifications(this.locationId, 5).subscribe(
      (res: any[]) => {
        if (res.length > 0) {
          this.atmosphericDate = moment(res[0]["fecha_notificacion"]).tz("America/Bogota").format("DD/MM/YYYY LT");
          this.atmosphericValue = res[0]["valor_variable_notificacion"];
          this.atmosphericGradient = "trending-" + res[0]["mensaje_notificacion"];
          this.atmosphericStatus = res[0]["titulo_notificacion"];
        }
      },
      (err) => console.log(err)
    );
  }

  getThermalSensationInformation() {
    this.notificationService.getNotifications(this.locationId, 8).subscribe(
      (res: any[]) => {
        if (res.length > 0) {
          this.notificationTime = moment(res[0]["fecha_notificacion"]).tz("America/Bogota").format("DD/MM/YYYY LT");
          this.thermalDate = moment(res[0]["fecha_notificacion"]).tz("America/Bogota").format("DD/MM/YYYY LT");
          this.thermalNotification = res[0]["id_notificacion"]
          this.thermalValue = res[0]["valor_variable_notificacion"];
          this.thermalDescription = res[0]["mensaje_notificacion"];
          this.thermalColor = res[0]["color_notificacion"];
          this.thermalStatus = res[0]["titulo_notificacion"];
          this.thermalUnits = res[0]["unidad_medida_notificacion"];
        }
        this.getUnitThermal()
      }
      
      ,
      (err) => console.log(err)
    );
  }

  async getUnitThermal() {
    const newvalue = await this.PreferenceService.read("thermalSensation")
    if (newvalue.value == "5") {
      let newvalue = (Math.round((parseInt(this.thermalValue.toString()) * (9 / 5)) + 32)).toString();
      this.thermalValue = newvalue;
      this.thermalUnits = "°F"
    } else if (newvalue.value == "7") {
      let newvalue = (Math.round((parseInt(this.thermalValue.toString()) + 273.15))).toString();
      this.thermalValue = newvalue;
      this.thermalUnits = "°K"
    }
  }

  async getUnitWind() {
    const newvalue = await this.PreferenceService.read("windSpeed")
    if(newvalue.value === "1"){
      this.windSpeed = Math.round(parseFloat(this.windSpeed.toString()) *  1.943844).toString()
      this.windUnit = "nudos"
    }
    
  }

  getWindSpeedInformation() {
    this.notificationService.getNotifications(this.locationId, 2).subscribe(
      (res: any[]) => {
        this.loadingController.dismiss();
        if (res.length > 0) {
          this.windDate = moment(res[0]["fecha_notificacion"]).tz("America/Bogota").format("DD/MM/YYYY LT");
          this.windNotification = res[0]["id_notificacion"]
          this.windSpeed = res[0]["valor_variable_notificacion"];
          this.windUnit = res[0]["unidad_medida_notificacion"];
          this.windColor = res[0]["color_notificacion"];
          this.windDescription = res[0]["mensaje_notificacion"];
          this.windStatus = res[0]["titulo_notificacion"];
        }
        this.getUnitWind()
      },
      (err) => console.log(err)
    );
  }

  getWindDirectionInformation() {
    this.notificationService.getNotifications(this.locationId, 1).subscribe(
      (res: any[]) => {
        if (res.length > 0) {
          this.windDirection = res[0]["valor_variable_notificacion"];
          this.windDirectionStatus = res[0]["titulo_notificacion"];
        }
      },
      (err) => console.log(err)
    );
  }

  getUvIndex() {
    this.notificationService.getUvIndex(this.latitud_estacion, this.longitud_estacion, this.locationCustomNameStation).subscribe(
      (res: String) => {
        this.uvValue = res;
      },
      (err) => console.log('muestrame el mensa de error de la varible ngAfterViewInit'+err)
    );
  }

  getSeaLevelInformation() {
    this.variableService.getInfoMeteorologicalVariable('sea level', this.locationCustomNameStation, '0231').subscribe(
      (res) => {
        let label_sensor_value = [];
        let label_sensor_date = [];
        let i = 0;
        for (var value in res.body) {
          i += 1
          if (i % 5 === 0) {
            if (!label_sensor_date.includes(res.body[value]['fecha'].substring(14, 16))) {
              label_sensor_value.push(res.body[value]['registro_sensor'])
              label_sensor_date.push(res.body[value]['fecha'].substring(10, 16))
            }
          }
        }
        Chart.register(...registerables);
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: label_sensor_date.slice(0, 60),
            datasets: [
              {
                label: 'Nivel del mar por minuto',
                fill: true,
                tension: 1,
                backgroundColor: '#73A5FF99',
                borderColor: '#73A5FF',
                borderCapStyle: 'round',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'round',
                pointBorderColor: '#73A5FF',
                pointBackgroundColor: '#ffff',
                pointBorderWidth: 1,
                pointHoverRadius: 1,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: label_sensor_value.slice(0, 60),
                spanGaps: false,
                hidden: false
              }
            ]
          },
          options: {

            plugins: {
              legend: {
                display: true,
                title: {
                  color: '#73A5FF',
                  font: {
                    size: 11
                  }
                },
                labels: {
                  color: '#73A5FF',
                  font: {
                    size: 11
                  }
                }
              }
            },
            scales: {
              x: {
                suggestedMin: 0,
                suggestedMax: 3,
                title: {
                  display: true,
                  text: 'Hora de medición'
                },
                grid: {
                  color: '#000',
                  borderColor: '#73A5FF',
                  tickColor: '#000'
                },
                ticks: {
                  display: true
                }
              },
              y: {
                suggestedMin: 0,
                suggestedMax: 3,
                title: {
                  display: true,
                  text: 'Metros'
                },
                ticks: {
                  display: true
                },
                grid: {
                  color: '#000',
                  borderColor: '#73A5FF',
                  tickColor: '#000'
                }
              }
            }
          }
        });
        const fecha = res.body[0]?.fecha;
        if (fecha) {
          this.seaLevelDate = moment(fecha).tz("America/Bogota").format("DD/MM/YYYY LT");
        }
      },
      (err) => console.log(err)
    );
  }

  getWindLevelInformation() {
    this.variableService.getInfoMeteorologicalVariable('wind level', this.locationCustomNameStation, '0068').subscribe(
      (res) => {
      },
      (err) => console.log(err)
    );
  }

  qualify(value, variable) {

    this.notificationService.qualifyNotification(variable, value).subscribe(
      (res) => {
        if (res["code"] == "1") {
          if (value == 1) {
            this.generateNotificacionUser("information-circle", " Calificaste la notificación como fue útil para mí", "success", false, null);
          } else {
            this.generateNotificacionUser("information-circle", " Calificaste la notificación como no fue útil para mí", "error", false, null);
          }
        } else if (res["code"] == "2") {
          this.generateNotificacionUser("close-circle", " ¡Ya calificaste esta notificación!", "warning", false, null);
        } else {
          this.generateNotificacionUser("close-circle", " ¡No guardamos tu calificación, vuelve a intentarlo!", "error", false, null);
        }

      },
      (err) => {
        this.generateNotificacionUser("close-circle", " ¡Comprueba tu conexión a Internet!", "error", false, null);
        console.log(err)
      }
    )
  }

  async generateNotificacionUser(icon: string, message: string, type: string, status: boolean, user_type: string) {
    const toast = await this.toastController.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: 'top',
      duration: 500,
      mode: "ios",
      cssClass: "toast-custom-class-" + type
    });
    toast.present();
    toast.onDidDismiss().then(
      (val) => {
        if (status && user_type.toLowerCase() == 'n') {
          this.route.navigate(['/tutorial']);
        } else if (status && user_type.toLowerCase() == 'a') {
          this.route.navigate(['/menu']);
        }
      }
    )
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 50000,
      message: 'Consultando..',
      //translucent: true,
      //cssClass: 'custom-class custom-loading',
      //backdropDismiss: true
    });
    await loading.present();
  }
}