import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3ComunidadePage } from './tab3_comunidade.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3ComunidadePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3ComunidadePageRoutingModule {}
