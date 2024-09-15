import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiKeyScreenPageRoutingModule } from './api-key-screen-routing.module';

import { ApiKeyScreenPage } from './api-key-screen.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiKeyScreenPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ApiKeyScreenPage]
})
export class ApiKeyScreenPageModule {}
