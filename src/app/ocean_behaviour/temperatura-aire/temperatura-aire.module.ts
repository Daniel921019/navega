import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TemperaturaAirePageRoutingModule } from './temperatura-aire-routing.module';
import { TemperaturaAirePage } from './temperatura-aire.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemperaturaAirePageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [TemperaturaAirePage]
})
export class TemperaturaAirePageModule {}
