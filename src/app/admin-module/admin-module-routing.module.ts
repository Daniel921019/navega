import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminModulePage } from './admin-module.page';

const routes: Routes = [
  {
    path: '',
    component: AdminModulePage
  },
  {
    path: 'api-form/:id_api',
    loadChildren: () => import('./apis/api-form/api-form.module').then( m => m.ApiFormPageModule)
  },
  {
    path: 'smtp-screen',
    loadChildren: () => import('./smtp/smtp-screen/smtp-screen.module').then( m => m.SmtpScreenPageModule)
  },
  {
    path: 'api-key-screen',
    loadChildren: () => import('./apis/api-key-screen/api-key-screen.module').then( m => m.ApiKeyScreenPageModule)
  },
  {
    path: 'database-view',
    loadChildren: () => import('./database/database-view/database-view.module').then( m => m.DatabaseViewPageModule)
  },
  {
    path: 'database-form/:id_database',
    loadChildren: () => import('./database/database-form/database-form.module').then( m => m.DatabaseFormPageModule)
  },
  {
    path: 'correo',
    loadChildren: () => import('./mail/correo-test/correo.module').then( m => m.CorreoPageModule)
  },
  {
    path: 'correo/bienvenida/:id_correo',
    loadChildren: () => import('./mail/bienvenida/bienvenida.module').then( m => m.BievenidaPageModule)
  },
  {
    path: 'correo/correo-form/:id_correo',
    loadChildren: () => import('./mail/correo-form/correo-form.module').then( m => m.CorreoFormModule)
  },
  {
    path: 'storage',
    loadChildren: () => import('./image/storage/storage.module').then( m => m.StoragePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/users-view/user-name-screen.module').then( m => m.UserNameModule)
  },
  {
    path: 'sensor',
    loadChildren: () => import('./sensors/sensor-events/sensor-events.module').then( m => m.SensorEventsModule)
  },

  {
    path: 'notification-events',
    loadChildren: () => import('./notification/notification-events/notification-events.module').then( m => m.NotificationEventsPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminModulePageRoutingModule {}
