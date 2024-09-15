import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DatabaseFormPageRoutingModule } from './database-form-routing.module';

import { DatabaseFormPage } from './database-form.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatabaseFormPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule 
  ],
  declarations: [DatabaseFormPage]
})
export class DatabaseFormPageModule {}
