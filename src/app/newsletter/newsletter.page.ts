import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { NewsletterService } from '../rest_api/service/newsletter.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-newsletter',
  templateUrl: 'newsletter.page.html',
  styleUrls: ['newsletter.page.scss'],
})
export class NewsletterPage implements OnInit {

  @ViewChild('monthIonSelect', { static: false }) private monthIonSelect: IonSelect;
  @ViewChild('yearIonSelect', { static: false }) private yearIonSelect: IonSelect;

  years: any = [];
  months: any = [];
  newsletters: any = [];
  coasts: any=["Caribe", "Pacífico"];
  coast_value: string = null;
  year_value: string = null;
  month_value: string = null;
  isLoading : boolean = false;
  url_newsletter: string = '';

  constructor(
    private newsletterService: NewsletterService,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {}

  async ngOnInit(){

    this.loadingMessage();
    this.newsletters = await this.getNewsletters();
    this.setYears();
    this.dismissLoading();
    this.monthIonSelect.disabled = true;
    this.yearIonSelect.disabled = true;

    if(!this.newsletters){
      this.toastUnsuccessful('No se pudo capturar la información, por favor verifique su conexión a internet o cambie los valores de busqueda.');
    }
  }

  async toastUnsuccessful(message : string){
    const toast = await this.toastController.create({
      message: message,
      duration: 4500,
      position:'bottom',
      color: 'danger',
      animated: true
    });
    await toast.present();
  }

  async loadingMessage() {
    this.isLoading = true;
    this.loadingController.create({
      message: 'Por favor espere un momento...'
    }).then(loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss();
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    this.loadingController.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }

  async getNewsletters(){

    return new Promise((resolve) => {

      this.newsletterService.getNewslettersInfo().subscribe(
        (res)=>{
          resolve(res.body);
        },
        (err) => console.log(err)
      );
    });
  }

  setYears(){

    for(var i=0; i < this.newsletters.dates.length; i++){
      this.years.push(this.newsletters.dates[i].year);
    }
  }

  setUrl(arr : any){

    for(var i=0; i < arr.length; i++){
      if(this.year_value === arr[i].year && this.month_value === arr[i].month){
        this.url_newsletter = 'https://docs.google.com/viewerng/viewer?url=' + arr[i].link + '&embedded=true';
        break;
      }
    }
  }

  areParametersCompleted(coast_event : any, month_event : any, year_event : any){

    if(coast_event != ''){

      this.coast_value = coast_event.detail.value;
      this.yearIonSelect.disabled = false;
    }
    else if(year_event != ''){

      this.year_value = year_event.detail.value;

      for(var i=0; i < this.newsletters.dates.length; i++){
          if(this.year_value === this.newsletters.dates[i].year){
            this.months=this.newsletters.dates[i].month;
            break;
          }
      }

      this.monthIonSelect.disabled = false;
    }
    else{
      this.month_value = month_event.detail.value;
    }

    if(this.coast_value && this.month_value && this.year_value){

      if(this.coast_value === 'Caribe'){
        this.setUrl(this.newsletters.data.caribe);
      }
      else{
        this.setUrl(this.newsletters.data.pacifico);
      }
    }
  }
  /*
  updateNewsletter(event : any, url : any){
    this.urlNewsletters = url.value;
  }
  */
}
