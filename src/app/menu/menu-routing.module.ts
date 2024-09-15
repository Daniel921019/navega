import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'location',
        loadChildren: () => import('../location/location.module').then(m => m.LocationPageModule)
      },
      {
        path: 'newsletter',
        loadChildren: () => import('../newsletter/newsletter.module').then(m => m.NewsletterPageModule)
      },
      {
        path: 'ocean_behaviour',
        loadChildren: () => import('../ocean_behaviour/ocean_behaviour.module').then(m => m.OceanBehaviourPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'admin-module',
        loadChildren: () => import('../admin-module/admin-module.module').then(m => m.AdminModulePageModule)
      },
      {
        path: '',
        redirectTo: '/menu/location',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/location',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    redirectTo: '/menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MenuPageRoutingModule {}
