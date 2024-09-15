import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresionAtmosfericaPage } from './presion-atmosferica.page';

const routes: Routes = [
  {
    path: '',
    component: PresionAtmosfericaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresionAtmosfericaPageRoutingModule {}
