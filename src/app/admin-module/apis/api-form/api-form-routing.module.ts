import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiFormPage } from './api-form.page';

const routes: Routes = [
  {
    path: '',
    component: ApiFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiFormPageRoutingModule {}
