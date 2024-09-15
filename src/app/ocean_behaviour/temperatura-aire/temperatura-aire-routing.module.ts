import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperaturaAirePage } from './temperatura-aire.page';

const routes: Routes = [
  {
    path: '',
    component: TemperaturaAirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperaturaAirePageRoutingModule {}
