import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgot-passsword',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'location-information/:locationId/:locationNameCity/:locationNameStation/:locationCustomNameStation/:latitud_estacion/:longitud_estacion',
    loadChildren: () => import('./location-information/location-information.module').then( m => m.LocationInformationPageModule)
  },
  {
    path: 'term-conditions',
    loadChildren: () => import('./term-conditions/term-conditions.module').then( m => m.TermConditionsPageModule)
  },
  {
    path: 'smart-analysis-detail/:locationCustomNameStation',
    loadChildren: () => import('./smart-analysis-detail/smart-analysis-detail.module').then( m => m.SmartAnalysisDetailPageModule)
  },
  {
    path: 'smart-analysis/:locationCustomNameStation',
    loadChildren: () => import('./smart-analysis/smart-analysis.module').then( m => m.SmartAnalysisPageModule)
  },
  {
    path: 'ocean_behaviour',
    loadChildren: () => import('./ocean_behaviour/ocean_behaviour.module').then( m => m.OceanBehaviourPageModule)
  },
  {
    path: 'admin-module',
    loadChildren: () => import('./admin-module/admin-module.module').then( m => m.AdminModulePageModule)
  },
  {
    path: 'admin-module/api-key-screen',
    loadChildren: () => import('./admin-module/apis/api-key-screen/api-key-screen.module').then( m => m.ApiKeyScreenPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./page-welcome/page-welcome.module').then( m => m.PageWelcomePageModule)
  },
  {
    path: 'new-user-form',
    loadChildren: () => import('./new-user-form/new-user-form.module').then( m => m.NewUserFormPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
