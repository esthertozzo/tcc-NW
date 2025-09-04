import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaPlanosPage } from './tela-planos.page';

const routes: Routes = [
  {
    path: '',
    component: TelaPlanosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaPlanosPageRoutingModule {}
