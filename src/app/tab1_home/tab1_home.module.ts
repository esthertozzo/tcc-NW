import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1HomePage } from './tab1_home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1HomePageRoutingModule } from './tab1_home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1HomePageRoutingModule
  ],
  declarations: [Tab1HomePage]
})
export class Tab1HomePageModule {}
