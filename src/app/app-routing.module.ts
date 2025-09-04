import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'tela-login',
    loadChildren: () => import('./tela-login/tela-login.module').then( m => m.TelaLoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab2_reconhecimento-facial',
    loadChildren: () => import('./tab2_reconhecimento-facial/tab2_reconhecimento-facial.module').then(m => m.Tab2ReconhecimentoFacialPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab1_home',
    loadChildren: () => import('./tab1_home/tab1_home.module').then(m => m.Tab1HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab3_comunidade',
    loadChildren: () => import('./tab3_comunidade/tab3_comunidade.module').then(m => m.Tab3ComunidadePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tela-cadastro',
    loadChildren: () => import('./tela-cadastro/tela-cadastro.module').then( m => m.TelaCadastroPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./tela-inicial/tela-inicial.module').then( m => m.TelaInicialPageModule)
  },
  {
    path: 'tela-perfil',
    loadChildren: () => import('./tela-perfil/tela-perfil.module').then( m => m.TelaPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tela-formulario',
    loadChildren: () => import('./tela-formulario/tela-formulario.module').then( m => m.TelaFormularioPageModule)
  },
  {
    path: 'tela-post',
    loadChildren: () => import('./tela-post/tela-post.module').then( m => m.TelaPostPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tela-planos',
    loadChildren: () => import('./tela-planos/tela-planos.module').then( m => m.TelaPlanosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
