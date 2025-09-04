import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3ComunidadePage } from './tab3_comunidade.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3ComunidadePageRoutingModule } from './tab3_comunidade-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3ComunidadePageRoutingModule
  ],
  declarations: [Tab3ComunidadePage]
})
export class Tab3ComunidadePageModule {}
