import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserNameRoutingModule } from './user-name-screen-routing.module';

import { UserNameScreen } from './user-name-screen.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserNameRoutingModule,
    ComponentsModule
  ],
  declarations: [UserNameScreen]
})
export class UserNameModule {}
