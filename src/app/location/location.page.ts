import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../rest_api/service/location.service';
import { LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})
export class LocationPage {

  locations: any = []
  findLocationName = "";

  constructor(
    private route: Router,
    private locationService: LocationService,
    private loadcontrol: LoadingController,
    private inAppBrowser: InAppBrowser
  ) { }

  findLocation(event) {
    this.findLocationName = event.detail.value;
  }

  searchInfoLocation(locationId, locationNameCity, locationNameStation, locationCustomNameStation, latitud_estacion, longitud_estacion) {
    this.route.navigate(['/location-information/' + locationId + '/' + locationNameCity + '/' + locationNameStation + '/' + locationCustomNameStation+ '/' + latitud_estacion + '/' + longitud_estacion]);
  }

  abrirEnlaceExterno(latitud_estacion, longitud_estacion) {
    const url = `https://maps.google.com/maps?q=${latitud_estacion},${longitud_estacion}&t=&z=12&ie=UTF8&iwloc`;
 
    const navegador = this.inAppBrowser.create(url, '_system');
    console.log('abrirEnlaceExterno2024')
    navegador.show();
  }
  

  ionViewWillEnter() {
    this.presentLoadingWithOptions();
    this.locationService.getAllLocation().subscribe(
      (res) => {
        this.locations = res.body;
        this.loadcontrol.dismiss();
      },
      (err) => console.log(err)
    );
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadcontrol.create({
      //spinner: null,
      duration: 1000,
      message: 'Consultando ..',
      //translucent: true,
      //cssClass: 'custom-class custom-loading',
      //backdropDismiss: true
    });
    await loading.present();
  }
}
