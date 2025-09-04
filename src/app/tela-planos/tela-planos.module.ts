import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaPlanosPageRoutingModule } from './tela-planos-routing.module';

import { TelaPlanosPage } from './tela-planos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaPlanosPageRoutingModule
  ],
  declarations: [TelaPlanosPage]
})
export class TelaPlanosPageModule {}
