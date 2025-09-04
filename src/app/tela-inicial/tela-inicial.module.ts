import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TelaInicialPageRoutingModule } from './tela-inicial-routing.module';
import { TelaInicialPage } from './tela-inicial.page';
import { NavbarComponent } from '../components/navbar/navbar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaInicialPageRoutingModule,
    NavbarComponent,
  ],
  declarations: [TelaInicialPage]
})
export class TelaInicialPageModule {}