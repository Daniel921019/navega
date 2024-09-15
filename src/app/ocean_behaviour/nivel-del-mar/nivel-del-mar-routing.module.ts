import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NivelDelMarPage } from './nivel-del-mar.page';

const routes: Routes = [
  {
    path: '',
    component: NivelDelMarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NivelDelMarPageRoutingModule {}
