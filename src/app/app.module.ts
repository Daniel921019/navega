import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipesModule } from './pipes/pipes.module';
import {IonicStorageModule} from '@ionic/storage-angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicStorageModule.forRoot()
    ,BrowserModule
    ,IonicModule.forRoot()
    ,AppRoutingModule
    ,HttpClientModule
    ,PipesModule
    ,MatDialogModule
    ,BrowserAnimationsModule 
    ,MatSnackBarModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },LocalNotifications, Storage, InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
