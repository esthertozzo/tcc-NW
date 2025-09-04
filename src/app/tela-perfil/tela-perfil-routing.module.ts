import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaPerfilPage } from './tela-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: TelaPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaPerfilPageRoutingModule {}
