import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTransferService } from '../ocean_behaviour_services/data-transfer.service';
import { DataPresentationService } from '../ocean_behaviour_services/data-presentation.service';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-precipitacion',
  templateUrl: './precipitacion.page.html',
  styleUrls: ['./precipitacion.page.scss'],
})
export class PrecipitacionPage implements OnInit {

  @ViewChild('line_chart', { static: false }) private line_chart: ElementRef;
  @ViewChild('trend_chart', { static: false }) private trend_chart: ElementRef;
  @ViewChild('monthIonSelect', { static: false }) private monthIonSelect: IonSelect;
  @ViewChild('stationIonSelect', { static: false }) private stationIonSelect: IonSelect;
  @ViewChild('yearIonSelect', { static: false }) private yearIonSelect: IonSelect;

  city : any = [];
  stations : any = [];
  months : any = [];
  sensor_id : any;
  station_value : string = null;
  month_value : string = null;
  data_selected : boolean = false;
  statistics : any = [];
  data_table : { caption : string; data : any }[];
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

    if(!this.years || !this.stations || !this.sensor_id || !this.city){
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
      this.sensor_id = await this.dataTransfer.getSensorIdFromApiRest("CPRPRG01");
    }catch(err){
      console.log(err);
    }
  }

  async getStatistics(sensor_id : string, station_id : string, month : string, max_days : string, year : string){

    try{
      return await this.dataTransfer.getStatistics(sensor_id, station_id, month, max_days, year);
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
          return station.station_id;
        }
      });

      let month_max_days = this.months.find((month: { name: string; max_days: string }) => {

        if(this.month_value === month.name){
          return month.max_days;
        }
      });

      let month_number = this.months.findIndex((m: { name: string; }) => m.name === this.month_value);

      let sensor_data = this.getSensorData(this.sensor_id.sensor_id, station_id.station_id, month_number + 1 + "", month_max_days.max_days, this.year_value);
      sensor_data.then(res => {

        let response : any = res;

        if(response.length > 0){

          this.dataPresentation.drawingChart('Valores diarios de la Precipitación - ' + this.month_value + ' ' + this.year_value, response, this.line_chart.nativeElement, 'bar',
            'Acumulado de Precipitación por día', this.month_value, this.year_value, 'Precipitación(mm)',
            '#00DAFF', '#005BFF');

          this.dataPresentation.drawingTrendChart('Tendencia de los Valores diarios de la Precipitación - ' + this.month_value + ' ' + this.year_value, response, this.trend_chart.nativeElement,
            'Tendencia de la Precipitación por día', this.month_value, this.year_value, 'Precipitación(mm)',
            '#D38300', '#744800');

          this.getStatistics(this.sensor_id.sensor_id, station_id.station_id, month_number + 1 + "", month_max_days.max_days, this.year_value).then(res2 => {

            this.statistics = res2;

            this.data_table = [

              {"caption": "Cantidad de datos", "data": this.statistics.count_data},
              {"caption": "Valor máximo mensual", "data": this.statistics.max_data + " mm"},
              {"caption": "Valor mínimo mensual", "data": this.statistics.min_data + " m"},
              {"caption": "Promedio mensual", "data": this.statistics.avg_data + " mm"},
              {"caption": "Desviación estandar", "data": this.statistics.std_data}
            ];

            this.dataPresentation.dismissLoading();
            this.data_selected = true;
            this.dataTransfer.toastMessage('Puede hacer click en la leyenda para apreciar mejor la gráfica.', 'success');
            //this.dataTransfer.disableIonSelects(this.stationIonSelect, this.yearIonSelect, this.monthIonSelect);
          });
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
}