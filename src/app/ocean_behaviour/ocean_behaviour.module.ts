import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OceanBehaviourPageRoutingModule } from './ocean_behaviour-routing.module';
import { OceanBehaviourPage } from './ocean_behaviour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OceanBehaviourPageRoutingModule
  ],
  declarations: [OceanBehaviourPage]
})
export class OceanBehaviourPageModule {}
