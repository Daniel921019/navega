import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationEventsPage } from './notification-events.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationEventsPageRoutingModule {}
