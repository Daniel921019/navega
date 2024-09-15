import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationEventsPageRoutingModule } from './notification-events-routing.module';

import { NotificationEventsPage } from './notification-events.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationEventsPageRoutingModule
  ],
  declarations: [NotificationEventsPage]
})
export class NotificationEventsPageModule {}
