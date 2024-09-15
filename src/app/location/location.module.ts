import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationPage } from './location.page';
import { LocationPageRoutingModule } from './location-routing.module';
import {PipesModule} from '../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LocationPageRoutingModule,
    PipesModule
  ],
  declarations: [
    LocationPage
  ]
})
export class LocationPageModule {}
