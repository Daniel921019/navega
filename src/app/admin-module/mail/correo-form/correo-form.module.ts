import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorreoForm } from './correo-form';
import { CorreoFormRoutingModule } from './correo-form-routing.module';
import { ComponentsModule } from 'src/app/admin-module/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CorreoForm }]),
    CorreoFormRoutingModule,
    ComponentsModule
  ],
  declarations: [CorreoForm]
})
export class CorreoFormModule {}
