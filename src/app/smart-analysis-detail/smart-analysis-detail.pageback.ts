import { Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import {
  Fuzzyfication,
  Precipitation,
  Wind,
  Windspeed, Uvindex
} from '../interfaces/interfaces';
import { Chart, registerables, Tooltip} from 'chart.js';
//import { Storage } from '@ionic/storage-angular';
import { GetVariablesInfoService } from '../rest_api/service/get-variables-info.service';
import { purge } from 'plotly.js-dist-min';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-smart-analysis-detail',
  templateUrl: './smart-analysis-detail.page.html',
  styleUrls: ['./smart-analysis-detail.page.scss'],
})
export class SmartAnalysisDetailPage implements OnInit {
  @ViewChild('lineCanvas') private lineCanvas : any;
  @ViewChild('lineCanvasAir') private lineCanvasAir : any;


  selectTabs = 'Oceano';
  windDescription: string;
  windTag: string;
  windImg: string;
  precipitationDescription: string;
  precipitationTag: string;
  precipitationImg: string;
  inferenceEngineDescription: string;
  inferenceEngineTag: string;
  inferenceEngineImg: string;
  //daniel
  uvindexTime: number;
  uvindexSuffix: string;
  uvindexIcon: string;
  uvindex: string;
  piechart: any;
  temp: number;
  feels_like: number;
  hour: number;
  config: any;
  arrayColor: any;
  arraySun: any;
  arraIuv: number;
  arrauv: any;
  arrayHome: string;
  arrayFishing: any;
  texSun: string;
  texHome: string;
  texFis: string;
  texUv: string;
  color: String;
  locationCustomNameStation: String;
  arrayCa: any;
  titulo_aire : String;
  cuerpo_aire: String;
  valor_aire: String;
  today: String;
  char_air: any;
  error_msj = ""

  //private _storage: Storage | null = null;


  constructor(private getVariablesInfoService: GetVariablesInfoService, private activatedRoute: ActivatedRoute, public loadingController: LoadingController, public toastController: ToastController, private route: Router) {}
  segmentChanged(ev: any) {
    if (ev.detail.value == "UV") {
      console.log('validar el metodo segmentChanged()....'+ev.detail.value);
      this.lineCanvas = ElementRef
      this.lineCanvasAir = ElementRef
      setTimeout(() => {
         
         this.getGraficoUv();
         this.getGraficoAir();
      }, 1000);
    }
  }
  //daniel mdofico este metodo o fucnion
  ngOnInit() {
    this.presentLoadingWithOptions();
    //console.log('pruebas presentLoadingWithOptions() '+this.presentLoadingWithOptions().then.arguments);
    this.locationCustomNameStation = this.activatedRoute.snapshot.paramMap.get('locationCustomNameStation');
    console.log('validar datos locationCustomNameStation'+this.locationCustomNameStation);
    this.getVariablesInfoService.getVariablesInfoService(this.locationCustomNameStation).subscribe((res) => {
      console.log('imprimiendo fallas do fallas'+res.uvindex);
      this.windDescription = res.wind.Fuzzyfication.description;
      this.windTag = res.wind.Fuzzyfication.linguisticValue;
      this.windImg = res.wind.Fuzzyfication.image.url;
      this.precipitationDescription = res.precipitation.Fuzzyfication.description;
      this.precipitationTag = res.precipitation.Fuzzyfication.linguisticValue;
      this.precipitationImg = res.precipitation.Fuzzyfication.image.url;
      this.inferenceEngineDescription = res.inferenceEngineValue.description;
      this.inferenceEngineTag = res.inferenceEngineValue.linguisticValue;
      this.inferenceEngineImg = res.inferenceEngineValue.image.url;
      this.uvindexTime = res.uvindex.time;
      this.uvindexSuffix = res.uvindex.suffix;
      this.uvindexIcon = res.uvindex.icon;
      this.feels_like = res.uvindex.feels_like;
      this.temp = res.uvindex.temp;
      this.uvindex = res.uvindex.iuv;
      this.hour = res.uvindex.hour;
      this.arrayColor = res.uvindex['all_iuv'][0];
      this.arraySun = res.uvindex['all_iuv'][1];
      this.arrayHome = res.uvindex['all_iuv'][2];
      this.arrayFishing = res.uvindex['all_iuv'][3];
      this.texSun = this.arraySun[this.hour];
      this.texHome = this.arrayHome[this.hour];
      this.texFis = this.arrayFishing[this.hour];
      this.arraIuv = res.uvindex['all_iuv'][4];
      this.arrauv = res.uvindex['all_iuv'][5];
      this.texUv = this.arrauv[this.hour];
      this.color = this.arrayColor[this.hour];
      this.arrayCa = res.uvindex['all_iuv'][6];
      this.titulo_aire = this.arrayCa[this.hour][1];
      this.cuerpo_aire = this.arrayCa[this.hour][2];
      this.valor_aire = this.arrayCa[this.hour][0];
      this.today = res.uvindex.today;
      this.error_msj = "procesado"
      this.loadingController.dismiss();
    
    }, 
    /*
    (err) => this.loadingController.dismiss()
    
    );
    */
    (err) => {
      console.log('los errores err---->'+err);
      this.loadingController.dismiss();
  });
  }

  getGraficoUv() {
    let uvindex = this.uvindex
    let arraIuv = this.arraIuv
    let arrayColor = this.arrayColor
    //let color = this.color
    let color = 'black'
    let hora = this.uvindexTime + ' ' + this.uvindexSuffix
    const thisdato = this

    var data = {
      labels: [], 
      datasets: [{
        label: '',
        data: [
          {key: 1,  hora: '0-1 AM'},
          {key: 1,  hora: '1-2 AM'},
          {key: 1,  hora: '2-3 AM'},
          {key: 1,  hora: '3-4 AM'},
          {key: 1,  hora: '4-5 AM'},
          {key: 1,  hora: '5-6 AM'},
          {key: 1,  hora: '6-7 AM'},
          {key: 1,  hora: '7-8 AM'},
          {key: 1,  hora: '8-9 AM'},
          {key: 1,  hora: '9-10 AM'},
          {key: 1,  hora: '10-11 AM'},
          {key: 1,  hora: '11-12 AM'},
          {key: 1,  hora: '12-1 PM'},
          {key: 1,  hora: '1-2 PM'},
          {key: 1,  hora: '2-3 PM'},
          {key: 1,  hora: '3-4 PM'},
          {key: 1,  hora: '4-5 PM'},
          {key: 1,  hora: '5-6 PM'},
          {key: 1,  hora: '6-7 PM'},
          {key: 1,  hora: '7-8 PM'},
          {key: 1,  hora: '8-9 PM'},
          {key: 1,  hora: '9-10 PM'},
          {key: 1,  hora: '10-11 PM'},
          {key: 1,  hora: '11-12 PM'},
        ], 
        backgroundColor: this.arrayColor,
        borderWidth: 1,
        cutout: '70%'
      }]
    };
    
    const centerText = {
      id: 'CenterText',
      afterDatasetsDraw(chart, args, options){
        const {ctx, chartArea: {left, right, top, bottom, width, height} } = chart;

        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index)=>{
            const {x, y} = datapoint.tooltipPosition();
            if(index == 6 || index == 12 || index == 18 || index == 0){
              var meridiem = index > 6 ? 'PM' : 'AM';
              var time = index == 0 ? 12 : index == 18 ? 6 : index;
              ctx.fillStyle = 'white';
              ctx.font = '12px Arial'
              ctx.fillText(time+''+meridiem, time == 12 ? x-16 : x-14, y)
            }
          })
          
        });

        ctx.save();
        const fontHeight = 30;
        const halffontHeight = fontHeight / 2;
        ctx.font = 'bolder '+fontHeight+'px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center'
        ctx.fillText('IUV: '+uvindex, width/2, height/2 + top);
        //ctx.restore();

        ctx.font = 'bolder '+halffontHeight+'px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center'
        ctx.fillText('Hora: '+hora, width/2, height/2 + top+fontHeight);
        ctx.restore();

      },
      
    }
    
    Chart.register(...registerables);
    new Chart(this.lineCanvas.nativeElement, {
      type: 'doughnut',
      data,
      options: {
        parsing: {
          key: 'key',

        },
        plugins:{
          tooltip:{
            callbacks: {
              label: (context)=>{
                hora = context.raw['hora']
                return context.raw['hora'];
              }
            }
          }
        },
        onClick(click, element, chart){
          uvindex = arraIuv[element[0].index]
          color = arrayColor[element[0].index]
          thisdato.thisdatos(element[0].index)
          thisdato.getGraficoAir(); 
          console.log('imprimir el valor que se estalla'+element);   
        },
      },
      plugins : [centerText]
      
    });  
    
  }

  getGraficoAir() {
    let txtAir = this.valor_aire;
    
    var data = {
      labels: [], 
      datasets: [{
        label: '',
        data: new Array(5).fill(1), 
        backgroundColor: ['#808080', '#808080', '#5AF208', '#808080'],
        borderWidth: 1,
        cutout: '85%',  
      }]
    };

    const centerText = {
      id: 'CenterText',
      afterDatasetsDraw(chart, args, options){
        const {ctx, chartArea: {left, right, top, bottom, width, height} } = chart;

        ctx.save();
        ctx.font = 'bolder 24px Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center'
        ctx.fillText(txtAir, width/2, height/2 + top)
        ctx.restore();
      }
    } 
    
    Chart.register(...registerables);
    this.char_air  = new Chart(this.lineCanvasAir.nativeElement, {
      type: 'doughnut',
      data,
      plugins : [centerText]
    });  
  }
 
  thisdatos(index){
    this.texHome = this.arrayHome[index]
    this.texSun = this.arraySun[index]
    this.texFis = this.arrayFishing[index]
    this.texUv = this.arrauv[index]
    this.color = this.arrayColor[index]
    this.titulo_aire = this.arrayCa[index][1]
    this.cuerpo_aire = this.arrayCa[index][2]
    this.valor_aire = this.arrayCa[index][0]
    this.char_air.destroy();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      
      //spinner: null, 10000
      duration: 10000,
      message: 'Consultando análisis inteligente...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();
    
    await loading.onDidDismiss().then(() => {
      if(this.error_msj == ""){
        this.generateNotificacionErro("close-circle", " Error, No se pueden mostrar recomendaciones en este momento ", "error", false, null);
        console.log('Mensaje de error para la presentacion presentLoadingWithOptions()  ', this.error_msj)
      }
    });
  
  }


  async generateNotificacionErro(icon: string, message: string, type: string, status: boolean, user_type: string) {
    const toast = await this.toastController.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: 'top',
      duration: 1000,
      mode: "ios",
      cssClass: "toast-custom-class-" + type
    });
    toast.present();
    toast.onDidDismiss().then(
      (val) => {
       // this.route.navigate(['menu/location']);
      }
    )
  }
}

