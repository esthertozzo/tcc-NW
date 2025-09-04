import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaPerfilPageRoutingModule } from './tela-perfil-routing.module';

import { TelaPerfilPage } from './tela-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaPerfilPageRoutingModule
  ],
  declarations: [TelaPerfilPage]
})
export class TelaPerfilPageModule {}
