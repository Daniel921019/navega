import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiFormPageRoutingModule } from './api-form-routing.module';

import { ApiFormPage } from './api-form.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiFormPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule 

  ],
  declarations: [ApiFormPage]
})
export class ApiFormPageModule {}
