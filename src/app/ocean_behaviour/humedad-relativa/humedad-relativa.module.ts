import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HumedadRelativaPageRoutingModule } from './humedad-relativa-routing.module';
import { HumedadRelativaPage } from './humedad-relativa.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HumedadRelativaPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [HumedadRelativaPage]
})
export class HumedadRelativaPageModule {}
