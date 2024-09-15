import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegimenVientosPageRoutingModule } from './regimen-vientos-routing.module';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { RegimenVientosPage } from './regimen-vientos.page';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlotlyModule,
    RegimenVientosPageRoutingModule
  ],
  declarations: [RegimenVientosPage]
})
export class RegimenVientosPageModule {}
