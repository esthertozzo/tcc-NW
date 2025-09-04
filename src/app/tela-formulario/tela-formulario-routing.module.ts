import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaFormularioPage } from './tela-formulario.page';

const routes: Routes = [
  {
    path: '',
    component: TelaFormularioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaFormularioPageRoutingModule {}
