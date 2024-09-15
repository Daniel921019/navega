import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTransferService } from '../ocean_behaviour_services/data-transfer.service';
import { DataPresentationService } from '../ocean_behaviour_services/data-presentation.service';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-regimen-vientos',
  templateUrl: './regimen-vientos.page.html',
  styleUrls: ['./regimen-vientos.page.scss'],
})
export class RegimenVientosPage implements OnInit {

  @ViewChild('monthIonSelect', { static: false }) private monthIonSelect: IonSelect;
  @ViewChild('yearIonSelect', { static: false }) private yearIonSelect: IonSelect;

  city : any = [];
  stations : any = [];
  months : any = [];
  dir_sensor_id : any;
  speed_sensor_id : any;
  station_value : string = null;
  month_value : string = null;
  data_selected : boolean = false;
  graph : any = {};
  years : any = [];
  year_value : string = null;

  constructor(private dataTransfer: DataTransferService,
              private dataPresentation: DataPresentationService) { }

  async ngOnInit() {

    this.dataPresentation.loadingMessage();
    this.city = this.dataTransfer.getCitySelected();
    this.years = this.dataTransfer.getYears();
    await this.getSensorId();
    await this.getStations();
    this.dataPresentation.dismissLoading();
    this.monthIonSelect.disabled = true;
    this.yearIonSelect.disabled = true;

    if(!this.years || !this.stations || !this.dir_sensor_id || !this.speed_sensor_id || !this.city){
      this.dataTransfer.toastMessage('No se pudo capturar la información, por favor verifique su conexión a internet o cambie los valores de busqueda.', 'danger');
    }
  }

  async getStations(){

    try{
      this.stations = await this.dataTransfer.getStationsFromApiRest(this.city.city_id);
    }catch(err){
      console.log(err);
    }
  }

  async getSensorId(){

    try{
      this.dir_sensor_id = await this.dataTransfer.getSensorIdFromApiRest("EWDASS01");
      this.speed_sensor_id = await this.dataTransfer.getSensorIdFromApiRest("EWSBSS01");
    }catch(err){
      console.log(err);
    }
  }

  async getSensorData(sensor_id : string, station_id : string, month : string, max_days : string, year : string){

    try{
      return await this.dataTransfer.getSensorDataApiRest(sensor_id, station_id, month, max_days, year);
    }catch(err){
      console.log(err);
    }
  }

  async getWindData(dir_sensor_id : string, speed_sensor_id : string, station_id : string, month : string, max_days : string, year : string){

    try{
      return await this.dataTransfer.getWindDataApiRest(dir_sensor_id, speed_sensor_id, station_id, month, max_days, year);
    }catch(err){
      console.log(err);
    }
  }

  areParametersCompleted(station_event : any, month_event : any, year_event : any){

    if(station_event != ''){

      this.station_value = station_event.detail.value;
      this.yearIonSelect.disabled = false;
      this.monthIonSelect.value='';
      this.yearIonSelect.value='';
    }
    else if(year_event != ''){

      this.year_value = year_event.detail.value;
      this.months = this.dataTransfer.getMonths(parseInt(this.year_value, 10));
      this.monthIonSelect.disabled = false;
      this.monthIonSelect.value='';
    }
    else{
      this.month_value = month_event.detail.value;
    }

    if(this.station_value && this.month_value && this.year_value){

      this.dataPresentation.loadingMessage();

      let station_id = this.stations.find((station: { station_id: string; station_name: string }) => {

        if(this.station_value === station.station_name){
          return station.station_id
        }
      });

      let month_max_days = this.months.find((month: { name: string; max_days: string }) => {

        if(this.month_value === month.name){
          return month.max_days;
        }
      });

      let month_number = this.months.findIndex((m: { name: string; }) => m.name === this.month_value);

      let sensor_data = this.getWindData(this.dir_sensor_id.sensor_id, this.speed_sensor_id.sensor_id, station_id.station_id, month_number + 1 + "", month_max_days.max_days, this.year_value);
      sensor_data.then(res => {

        let response : any = res;

        if(response.length > 0){

          this.windChart(response[0]);
          this.dataPresentation.dismissLoading();
          this.data_selected = true;
          this.dataTransfer.toastMessage('Puede hacer click en la leyenda para apreciar mejor la gráfica.', 'success');
          //this.dataTransfer.disableIonSelects(this.stationIonSelect, this.yearIonSelect, this.monthIonSelect);
        }
        else{
          this.dataPresentation.dismissLoading();
          this.data_selected = false;
          this.dataTransfer.toastMessage('No se encontraron datos, por favor cambie los valores de busqueda.', 'danger');
          //this.dataTransfer.disableIonSelects(this.stationIonSelect, this.yearIonSelect, this.monthIonSelect);
        }
      });
    }
  }

  windChart(frequencies : any){

    const points : any = ["Norte", "N-E", "Este", "S-E", "Sur", "S-O", "Oeste", "N-O"];

    this.graph = {

      data: [
        {
          r: [frequencies.Norte[5], frequencies.NE[5], frequencies.Este[5], frequencies.SE[5], frequencies.Sur[5], frequencies.SO[5], frequencies.Oeste[5], frequencies.NO[5]],
          theta: points,
          name: " >= 17 Nudos",
          marker: {color: "rgb(255, 231, 0)"},
          type: "barpolar"
        },
        {
          r: [frequencies.Norte[4], frequencies.NE[4], frequencies.Este[4], frequencies.SE[4], frequencies.Sur[4], frequencies.SO[4], frequencies.Oeste[4], frequencies.NO[4]],
          theta: points,
          name: "11-17 Nudos",
          marker: {color: "rgb(0, 255, 168)"},
          type: "barpolar"
        },
        {
          r: [frequencies.Norte[3], frequencies.NE[3], frequencies.Este[3], frequencies.SE[3], frequencies.Sur[3], frequencies.SO[3], frequencies.Oeste[3], frequencies.NO[3]],
          theta: points,
          name: "7-11 Nudos",
          marker: {color: "rgb(0, 174, 173)"},
          type: "barpolar"
        },
        {
          r: [frequencies.Norte[2], frequencies.NE[2], frequencies.Este[2], frequencies.SE[2], frequencies.Sur[2], frequencies.SO[2], frequencies.Oeste[2], frequencies.NO[2]],
          theta: points,
          name: "4-7Nudos",
          marker: {color: "rgb(0, 100, 180)"},
          type: "barpolar"
        },
        {
          r: [frequencies.Norte[1], frequencies.NE[1], frequencies.Este[1], frequencies.SE[1], frequencies.Sur[1], frequencies.SO[1], frequencies.Oeste[1], frequencies.NO[1]],
          theta: points,
          name: "1-4 Nudos",
          marker: {color: "rgb(0, 7, 134)"},
          type: "barpolar"
        },
        {
          r: [frequencies.Norte[0], frequencies.NE[0], frequencies.Este[0], frequencies.SE[0], frequencies.Sur[0], frequencies.SO[0], frequencies.Oeste[0], frequencies.NO[0]],
          theta: points,
          name: "0-1 Nudos",
          marker: {color: "rgb(0, 0, 0)"},
          type: "barpolar"
        }
      ],

      layout: {
        title: "<b>Distribución del Régimen<br>de Vientos en " + this.city.city_name + "<br>" + this.month_value + " " + this.year_value + "</b>",
        font: {family: 'Arial, monospace', size: 11},
        legend: {font: {family: 'Arial, monospace',size: 14}},
        polar: {
          barmode: "overlay",
          bargap: 0,
          radialaxis: {ticksuffix: "%", angle: 45, dtick: 5},
          angularaxis: {direction: "clockwise"}
        },
        clickmode: 'none',
        dragmode: false
      },
      config: { displayModeBar: false }
    };
  }
}