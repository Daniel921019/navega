import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrecipitacionPage } from './precipitacion.page';

const routes: Routes = [
  {
    path: '',
    component: PrecipitacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrecipitacionPageRoutingModule {}
