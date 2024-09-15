import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmartAnalysisDetailPageRoutingModule } from './smart-analysis-detail-routing.module';

import { SmartAnalysisDetailPage } from './smart-analysis-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmartAnalysisDetailPageRoutingModule
  ],
  declarations: [SmartAnalysisDetailPage]
})
export class SmartAnalysisDetailPageModule {}
