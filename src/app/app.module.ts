import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component'; // importe o standalone
import { HttpClientModule }  from '@angular/common/http'
import { EditarPerfilModalComponent } from './components/editar-perfil-modal/editar-perfil-modal.component';
import { PoliticasModalComponent } from './components/politicas-modal/politicas-modal.component';
@NgModule({
  declarations: [AppComponent, EditarPerfilModalComponent, PoliticasModalComponent],
  imports: [FormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, NavbarComponent, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
