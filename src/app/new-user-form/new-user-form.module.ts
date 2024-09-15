import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewUserFormPageRoutingModule } from './new-user-form-routing.module';

import { NewUserFormPage } from './new-user-form.page';
import { SignUpPageRoutingModule } from '../sign-up/sign-up-routing.module';
import { TermConditionsPageModule } from '../term-conditions/term-conditions.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewUserFormPageRoutingModule,
    SignUpPageRoutingModule,
    TermConditionsPageModule,
    ReactiveFormsModule,
  ],
  declarations: [NewUserFormPage],
  providers: [Storage]
})
export class NewUserFormPageModule {}
