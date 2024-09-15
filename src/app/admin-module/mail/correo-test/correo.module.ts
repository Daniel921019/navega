import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorreoPage } from './correo.page';
import { CorreoPageRoutingModule } from './correo-routing.module';
import { ComponentsModule} from 'src/app/admin-module/components/components.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CorreoPage }]),
    CorreoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CorreoPage]
})
export class CorreoPageModule {}
