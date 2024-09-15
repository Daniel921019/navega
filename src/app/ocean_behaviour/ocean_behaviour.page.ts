import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from './ocean_behaviour_services/data-transfer.service';
import { DataPresentationService } from './ocean_behaviour_services/data-presentation.service';

@Component({
  selector: 'app-ocean_behaviour',
  templateUrl: './ocean_behaviour.page.html',
  styleUrls: ['./ocean_behaviour.page.scss'],
})
export class OceanBehaviourPage implements OnInit {

  location_value : string = null;
  cities : any = [];
  buttons_values : any = [

    { name: "Régimen de<br>Vientos", link:"regimen-vientos" },
    { name: "Temperatura del<br>Aire", link:"temperatura-aire" },
    { name: "Nivel del Mar", link:"nivel-del-mar" },
    { name: "Humedad<br>Relativa", link:"humedad-relativa" },
    { name: "Presión<br>Atmosférica", link:"presion-atmosferica" },
    { name: "Precipitación", link:"precipitacion"}
  ];

  constructor(private router: Router,
              private dataTransfer: DataTransferService,
              private dataPresentation: DataPresentationService) { }

  async ngOnInit() {

    this.dataPresentation.loadingMessage();
    await this.dataTransfer.getYearsAndMonths();
    await this.getCities();
    this.dataPresentation.dismissLoading();
  }

  async getCities(){

    try{
      this.cities = await this.dataTransfer.getAllCitiesFromApiRest();
    }catch(err){
      console.log(err);
    }
  }

  isParameterCompleted(event : any){

    this.location_value = event.detail.value;
  }

  isLocationSelected(button_object : any){

    if(!this.location_value){

      this.dataTransfer.toastMessage('Seleccione un municipio para continuar.', 'danger');
    }
    else{

      let city_data = this.cities.find((city: { city_name: string; dept_name: string; city_id: string; }) => {

        if(this.location_value === city.city_name + " - " + city.dept_name){
          return city.city_id;
        }
      });

      this.router.navigate(['/menu/ocean_behaviour/' + button_object.link]);
      this.dataTransfer.setCitySelected({

        city_id: city_data.city_id,
        city_name: this.location_value,
      });
    }
  }
}
