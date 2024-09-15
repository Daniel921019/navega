import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { TermConditionsPage } from '../term-conditions/term-conditions.page';
import { TermConditionsPageModule } from '../term-conditions/term-conditions.module';

@NgModule({
  entryComponents:[
    TermConditionsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    TermConditionsPageModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
