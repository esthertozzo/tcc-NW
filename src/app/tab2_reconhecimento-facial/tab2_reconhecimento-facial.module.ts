import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2ReconhecimentoFacialPage } from './tab2_reconhecimento-facial.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2ReconhecimentoFacialPageRoutingModule } from './tab2_reconhecimento-facial-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2ReconhecimentoFacialPageRoutingModule
  ],
  declarations: [Tab2ReconhecimentoFacialPage]
})
export class Tab2ReconhecimentoFacialPageModule {}
