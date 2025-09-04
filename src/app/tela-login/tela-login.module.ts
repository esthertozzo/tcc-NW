import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaLoginPageRoutingModule } from './tela-login-routing.module';

import { TelaLoginPage } from './tela-login.page';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaLoginPageRoutingModule,
    NavbarComponent,
  ],
  declarations: [TelaLoginPage]
})
export class TelaLoginPageModule {}
