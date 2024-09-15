import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmartAnalysisPage } from './smart-analysis.page';

const routes: Routes = [
  {
    path: '',
    component: SmartAnalysisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartAnalysisPageRoutingModule {}
