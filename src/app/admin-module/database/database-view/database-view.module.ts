import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatabaseViewPageRoutingModule } from './database-view-routing.module';

import { DatabaseViewPage } from './database-view.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatabaseViewPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DatabaseViewPage]
})
export class DatabaseViewPageModule {}
