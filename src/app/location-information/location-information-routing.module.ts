import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationInformationPage } from './location-information.page';

const routes: Routes = [
  {
    path: '',
    component: LocationInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationInformationPageRoutingModule {}
