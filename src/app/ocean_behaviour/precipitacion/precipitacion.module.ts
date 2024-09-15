import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrecipitacionPageRoutingModule } from './precipitacion-routing.module';
import { PrecipitacionPage } from './precipitacion.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrecipitacionPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [PrecipitacionPage]
})
export class PrecipitacionPageModule {}
