import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserNameScreen } from './user-name-screen.page';

const routes: Routes = [
  {
    path: '',
    component: UserNameScreen
  },
  {
    path: 'user-profile/:id_usuario',
    loadChildren: () => import('../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserNameRoutingModule {}
