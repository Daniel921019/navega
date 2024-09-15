import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsletterPage } from './newsletter.page';

const routes: Routes = [
  {
    path: '',
    component: NewsletterPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterPageRoutingModule {}