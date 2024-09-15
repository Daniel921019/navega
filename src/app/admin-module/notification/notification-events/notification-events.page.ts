import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notification-events',
  templateUrl: './notification-events.page.html',
  styleUrls: ['./notification-events.page.scss'],
})
export class NotificationEventsPage implements OnInit {
  titulo = 'Eventos de Notificación'
  href: string = '/admin-module'
  dataViento: any
  dataNivelMar: any
  dataPrecipitacion: any
  dataPresionAtmosferica: any
  dataSensacionTermica: any
  dataNotificaciones: any
  isLoading: boolean = false
  nameFilter: string = 'Filtro ocultando n/a'


  filterNa = false
  filterIcon = "funnel-outline"

  constructor( private adminService: AdminService, 
              private snack: ToastController
    ) { }
  
  ngOnInit() {
    this.NotificationEvent(this.filterNa)
  }

  changeFilter(): void {
    this.filterNa = !this.filterNa;
    if (this.filterNa) {
      this.NotificationEvent(this.filterNa)
      this.filterIcon = "funnel";
      this.nameFilter = 'Filtro con n/a'
    } else {
      this.NotificationEvent(this.filterNa)
      this.filterIcon = "funnel-outline";
      this.nameFilter = 'Filtro ocultando n/a'
    }
  }
  

  NotificationEvent(filter: boolean){
    this.isLoading = true
    this.adminService.getNotificationEvent(filter).subscribe(
      (res) => {
        this.dataViento = {nombre: 'Direccion Viento', data: res[1], icon:'compass-outline' }      
        this.dataNivelMar = {nombre: 'Velocidad Viento', data: res[2], icon: 'water-outline' }      
        this.dataPrecipitacion = {nombre: 'Precipitacion', data: res[4], icon: 'umbrella-outline' }      
        this.dataPresionAtmosferica = {nombre: 'Presion Atmosferica', data: res[5], icon: 'thunderstorm-outline' }      
        this.dataSensacionTermica = {nombre: 'Sensacion termica ', data: res[8], icon:'thermometer-outline' } 
        // this.dataNotificaciones.push(this.dataViento,  this.dataNivelMar, this.dataPrecipitacion,this.dataPresionAtmosferica,this.dataSensacionTermica)   
        this.isLoading = false
      },
      async err => {
        this.isLoading = false
        const toast = await this.snack.create({
          message: err.message,
          duration: 5000,
          cssClass: 'color-toast-danger'
        });
        toast.present();
      }
      );
  }
}