import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminModulePageRoutingModule } from './admin-module-routing.module';

import { AdminModulePage } from './admin-module.page';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminModulePageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminModulePage]
})
export class AdminModulePageModule {}
