import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmartAnalysisPageRoutingModule } from './smart-analysis-routing.module';

import { SmartAnalysisPage } from './smart-analysis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmartAnalysisPageRoutingModule
  ],
  declarations: [SmartAnalysisPage]
})
export class SmartAnalysisPageModule {}
