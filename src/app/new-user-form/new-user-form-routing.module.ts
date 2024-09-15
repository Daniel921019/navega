import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewUserFormPage } from './new-user-form.page';

const routes: Routes = [
  {
    path: '',
    component: NewUserFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewUserFormPageRoutingModule {}
