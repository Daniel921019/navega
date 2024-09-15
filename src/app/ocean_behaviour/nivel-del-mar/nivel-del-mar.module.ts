import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NivelDelMarPageRoutingModule } from './nivel-del-mar-routing.module';
import { NivelDelMarPage } from './nivel-del-mar.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NivelDelMarPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [NivelDelMarPage]
})
export class NivelDelMarPageModule {}
