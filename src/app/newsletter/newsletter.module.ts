import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsletterPage } from './newsletter.page';
import { NewsletterPageRoutingModule } from './newsletter-routing.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NewsletterPageRoutingModule,
    PipesModule
  ],
  declarations: [NewsletterPage]
})
export class NewsletterPageModule {}