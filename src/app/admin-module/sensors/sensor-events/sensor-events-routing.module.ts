import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorEvents } from './sensor-events.page';

const routes: Routes = [
  {
    path: '',
    component: SensorEvents
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndpointsRoutingModule {}
