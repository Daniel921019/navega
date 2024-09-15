import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OceanBehaviourPage } from './ocean_behaviour.page';

const routes: Routes = [
  {
    path: '',
    component: OceanBehaviourPage
  },
  {
    path: 'nivel-del-mar',
    loadChildren: () => import('./nivel-del-mar/nivel-del-mar.module').then( m => m.NivelDelMarPageModule)
  },
  {
    path: 'precipitacion',
    loadChildren: () => import('./precipitacion/precipitacion.module').then( m => m.PrecipitacionPageModule)
  },
  {
    path: 'humedad-relativa',
    loadChildren: () => import('./humedad-relativa/humedad-relativa.module').then( m => m.HumedadRelativaPageModule)
  },
  {
    path: 'temperatura-aire',
    loadChildren: () => import('./temperatura-aire/temperatura-aire.module').then( m => m.TemperaturaAirePageModule)
  },
  {
    path: 'presion-atmosferica',
    loadChildren: () => import('./presion-atmosferica/presion-atmosferica.module').then( m => m.PresionAtmosfericaPageModule)
  },
  {
    path: 'regimen-vientos',
    loadChildren: () => import('./regimen-vientos/regimen-vientos.module').then( m => m.RegimenVientosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OceanBehaviourPageRoutingModule {}
