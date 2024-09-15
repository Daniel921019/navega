import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HumedadRelativaPage } from './humedad-relativa.page';

const routes: Routes = [
  {
    path: '',
    component: HumedadRelativaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumedadRelativaPageRoutingModule {}