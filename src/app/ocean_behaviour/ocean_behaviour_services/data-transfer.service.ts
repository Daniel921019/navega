import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OceanBehaviorService } from '../../rest_api/service/ocean_behaviour.service';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  city_selected : any = [];
  years_months : any = [];

  constructor(
    private oceanBehavior: OceanBehaviorService,
    private toastController: ToastController){ }

  getAllCitiesFromApiRest(){

    return new Promise((resolve) => {

      this.oceanBehavior.getAllCities().subscribe(
        (res) => {
          resolve(res.body);
        },
        (err) => console.log(err)
      );
    });
  }

  getYearsAndMonthsFromApiRest(){

    return new Promise((resolve) => {

      this.oceanBehavior.getYearsAndMonths().subscribe(
        (res) => {
          resolve(res.body);
        },
        (err) => console.log(err)
      );
    });
  }

  getSensorIdFromApiRest(sensor_code : string){

    return new Promise((resolve) => {

      this.oceanBehavior.getSensorId(sensor_code).subscribe(
        (res) => {
          resolve(res.body);
        },
        (err) => console.log(err)
      );
    });
  }

  setCitySelected(data : any){

    this.city_selected = data;
  }

  getCitySelected(){

    if(this.city_selected.city_name === 'Providencia - Archipiélago de San Andrés, Providencia y Santa Catalina'){
      this.city_selected.city_name = 'Isla de Providencia';
    }
    else if(this.city_selected.city_name === 'San Andrés - Archipiélago de San Andrés, Providencia y Santa Catalina'){
      this.city_selected.city_name = 'Isla de San Andrés';
    }

    return this.city_selected;
  }

  getStationsFromApiRest(city_id : string){

    return new Promise((resolve) => {

      this.oceanBehavior.getAllStations(city_id).subscribe(
        (res) => {
          resolve(res.body);
        },
        (err) => console.log(err)
      );
    });
  }

  getSensorDataApiRest(sensor_id: string, station_id: string, month : string, max_day : string, year : string) {

    return new Promise((resolve) => {

      this.oceanBehavior.getSensorData(sensor_id, station_id, month, max_day, year).subscribe(
        (res) => {
          resolve(res.body);
        },
        (err) => console.log(err)
      );
    });
  }

  getWindDataApiRest(dir_sensor_id: string, speed_sensor_id: string, station_id: string, month : string, max_day : string, year : string) {

    return new Promise((resolve) => {

      this.oceanBehavior.getWindData(dir_sensor_id, speed_sensor_id, station_id, month, max_day, year).subscribe(
        (res) => {
          resolve(res.body);
        },
        (err) => console.log(err)
      );
    });
  }

  getStatistics(sensor_id: string, station_id: string, month : string, max_day : string, year : string) {

    return new Promise((resolve) => {

      this.oceanBehavior.getStatistics(sensor_id, station_id, month, max_day, year).subscribe(
        (res) => {
          resolve(res.body);
        },
        (err) => console.log(err)
      );
    });
  }

  async getYearsAndMonths(){

    if(this.years_months.length == 0){

      try{
        this.years_months = await this.getYearsAndMonthsFromApiRest();
      }catch(err){
        console.log(err);
      }
    }
  }

  getMonths(year : number){

    for(let i=0; i < this.years_months.length; i++){

      if(this.years_months[i].years == year){
        return this.years_months[i].months;
      }
    }
  }

  getYears(){

    let years = [];

    for(let i=0; i < this.years_months.length; i++){
      years.push(this.years_months[i].years);
    }

    return years;
  }

  async toastMessage(message : string, color : string){
    const toast = await this.toastController.create({
      message: message,
      duration: 4500,
      position:'bottom',
      color: color,
      animated: true
    });
    await toast.present();
  }

  disableIonSelects(station : any, year : any, month : any){

    month.value = '';
    station.value = '';
    year.value = '';

    month.disabled = true;
    year.disabled = true;
  }
}