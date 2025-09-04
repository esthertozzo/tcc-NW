import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SugestoesService, Sugestao, DadosFormulario } from '../services/sugestoes.service';


@Component({
  selector: 'app-tab1_home',
  templateUrl: 'tab1_home.page.html',
  styleUrls: ['tab1_home.page.scss'],
  standalone: false
})
export class Tab1HomePage implements OnInit {

  sugestaoDoDia: Sugestao | null = null;
  sugestoesPersonalizadas: Sugestao[] = [];
  carregando = true;

constructor(private navCtrl: NavController, private sugestoesService: SugestoesService) {}

async ngOnInit() {
  console.log('Tab1 carregada');
  await this.carregarSugestoes();
}

async carregarSugestoes() {
  try{
    this.carregando = true;

    this.sugestaoDoDia = await this.sugestoesService.getSugestaoDoDia();

    this.sugestoesPersonalizadas = await this.sugestoesService.gerarSugestoesPersonalizadas();

    console.log('Sugestões carregadas:',{
      sugestaoDoDia: this.sugestaoDoDia,
      sugestoesPersonalizadas: this.sugestoesPersonalizadas.length
    });
  } catch (error) {
    console.error('Erro ao carregar sugestões:', error);
  } finally {
    this.carregando = false;
  }
}

 perfil() {
    console.log('Clicado');
    this.navCtrl.navigateRoot('/tela-perfil');
  }

  planos() {
    console.log('Navegando para planos');
    this.navCtrl.navigateRoot('/tela-planos');
  }

  post() {
    console.log('Navegando para criar post');
    this.navCtrl.navigateRoot('/tela-post');
  }

  async recarregarSugestoes(event: any){
    await this.carregarSugestoes();
    event.target.complete();
  }

  verDetalhesSugestao(sugestao: Sugestao) {
    console.log('Ver detalhes da sugestão:', sugestao);
    // implementar navegação para a página de detalhes ou modal com informações
}

trackBySugestao(index: number, sugestao: Sugestao): string {
  return sugestao.titulo;
}

// Método para demonstração - criar dados de teste
 async criarDadosTeste() {
   const dadosTeste: DadosFormulario = {
     preferencias: ['Maquiagem Natural', 'Rotina Rápida', 'Iluminar Rosto'],
     pele: {
       tipo: 'Oleosa',
       sensibilidade: 'Sim',
       tom: 'Médio',
       condicoes: ['Acne / Oleosidade', 'Olheiras']
     }
   };

   try {
     await this.sugestoesService.salvarDadosFormulario(dadosTeste);
     console.log('Dados de teste criados com sucesso!');
     await this.carregarSugestoes();
   } catch (error) {
     console.error('Erro ao criar dados de teste:', error);
   }
 }
}