import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2ReconhecimentoFacialPage } from './tab2_reconhecimento-facial.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2ReconhecimentoFacialPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2ReconhecimentoFacialPageRoutingModule {}
