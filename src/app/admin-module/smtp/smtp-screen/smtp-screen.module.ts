import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmtpScreenPageRoutingModule } from './smtp-screen-routing.module';

import { SmtpScreenPage } from './smtp-screen.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SmtpScreenPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [SmtpScreenPage]
})
export class SmtpScreenPageModule {}
