import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorreoForm } from './correo-form';

const routes: Routes = [
  {
    path: '',
    component: CorreoForm,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorreoFormRoutingModule {}
