import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaCadastroPage } from './tela-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: TelaCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaCadastroPageRoutingModule {}
