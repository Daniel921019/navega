import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationInformationPageRoutingModule } from './location-information-routing.module';

import { LocationInformationPage } from './location-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationInformationPageRoutingModule
  ],
  declarations: [LocationInformationPage]
})
export class LocationInformationPageModule {}
