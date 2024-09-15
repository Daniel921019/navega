import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PresionAtmosfericaPageRoutingModule } from './presion-atmosferica-routing.module';
import { PresionAtmosfericaPage } from './presion-atmosferica.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresionAtmosfericaPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [PresionAtmosfericaPage]
})
export class PresionAtmosfericaPageModule {}
