import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1_home/tab1_home.module').then(m => m.Tab1HomePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2_reconhecimento-facial/tab2_reconhecimento-facial.module').then(m => m.Tab2ReconhecimentoFacialPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3_comunidade/tab3_comunidade.module').then(m => m.Tab3ComunidadePageModule)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
