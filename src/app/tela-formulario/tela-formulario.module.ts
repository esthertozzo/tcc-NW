import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaFormularioPageRoutingModule } from './tela-formulario-routing.module';

import { TelaFormularioPage } from './tela-formulario.page';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaFormularioPageRoutingModule,
    NavbarComponent,
  ],
  declarations: [TelaFormularioPage]
})
export class TelaFormularioPageModule {}
