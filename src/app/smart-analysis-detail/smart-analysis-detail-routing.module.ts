import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmartAnalysisDetailPage } from './smart-analysis-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SmartAnalysisDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartAnalysisDetailPageRoutingModule {}
