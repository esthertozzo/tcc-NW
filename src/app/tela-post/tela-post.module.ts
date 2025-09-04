import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaPostPageRoutingModule } from './tela-post-routing.module';

import { TelaPostPage } from './tela-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaPostPageRoutingModule
  ],
  declarations: [TelaPostPage]
})
export class TelaPostPageModule {}
