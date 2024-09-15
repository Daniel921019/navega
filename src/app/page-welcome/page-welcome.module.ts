import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

import { IonicModule } from '@ionic/angular';

import { PageWelcomePageRoutingModule } from './page-welcome-routing.module';

import { PageWelcomePage } from './page-welcome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageWelcomePageRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [PageWelcomePage]
})
export class PageWelcomePageModule {}
