import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndpointsRoutingModule } from './sensor-events-routing.module';

import { SensorEvents } from './sensor-events.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndpointsRoutingModule,
    ComponentsModule
  ],
  declarations: [SensorEvents]
})
export class SensorEventsModule {}
