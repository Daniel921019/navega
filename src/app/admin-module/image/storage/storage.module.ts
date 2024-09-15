import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoragePageRoutingModule } from './storage-routing.module';

import { StoragePage } from './storage.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    StoragePageRoutingModule
  ],
  declarations: [StoragePage]
})
export class StoragePageModule {}
