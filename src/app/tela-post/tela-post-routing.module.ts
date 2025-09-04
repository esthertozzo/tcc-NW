import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaPostPage } from './tela-post.page';

const routes: Routes = [
  {
    path: '',
    component: TelaPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaPostPageRoutingModule {}
