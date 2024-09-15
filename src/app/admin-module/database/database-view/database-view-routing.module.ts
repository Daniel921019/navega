import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabaseViewPage } from './database-view.page';

const routes: Routes = [
  {
    path: '',
    component: DatabaseViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatabaseViewPageRoutingModule {}
