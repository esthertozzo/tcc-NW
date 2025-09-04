import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, IonModal } from '@ionic/angular';
import { SugestoesService, DadosFormulario } from '../services/sugestoes.service';

@Component({
  selector: 'app-tela-formulario',
  templateUrl: './tela-formulario.page.html',
  styleUrls: ['./tela-formulario.page.scss'],
  standalone: false
})
export class TelaFormularioPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  presentingElement: any;
  canDismiss = true;

  etapaAtual: number = 1;
  totalEtapas: number = 4; // serao 4 etapas para uma melhor experiencia do usuario

  preferencias: string[] = [];

  opcoes = [
    { nome: 'Maquiagem Natural', imagem: 'assets/icon/makeover.png' },
    { nome: 'Look Ousado', imagem: 'assets/icon/clothes-hanger.png' },
    { nome: 'Iluminar Rosto', imagem: 'assets/icon/brush.png' },
    { nome: 'Valorizar Olhos', imagem: 'assets/icon/sobrancelha.png' },
    { nome: 'Disfarçar Olheiras', imagem: 'assets/icon/olheiras.png' },
    { nome: 'Rotina Rápida', imagem: 'assets/icon/rotina.png' },
  ];

  // Dados da pele
  pele = {
    tipo: '',
    sensibilidade: '',
    tom: '',
    condicoes: [] as string[] // pode escolher várias condições
  };

  tiposDePele = ['Oleosa', 'Seca', 'Mista', 'Normal', 'Não sei dizer'];
  tonsDePeleComCor = [
  { nome: 'Muito Claro', cor: '#fbe8e2' },
  { nome: 'Claro', cor: '#f3d0b8' },
  { nome: 'Médio', cor: '#d9a56c' },
  { nome: 'Moreno', cor: '#a05d2d' },
  { nome: 'Escuro', cor: '#5a3a2e' },
  { nome: 'Não sei dizer', cor: '#e0e0e0' }
];
  sensibilidades = ['Sim', 'Não', 'Às vezes'];
  condicoes = ['Acne / Oleosidade', 'Alergias', 'Manchas', 'Linhas finas', 'Olheiras', 'Nenhuma dessas'];



  constructor(private navCtrl: NavController, private sugestoesService: SugestoesService) {}

   ngOnInit() {
    // inicialização do componente
  }

  // Preferências (Etapa 1)
  selecionar(nome: string) {
    const i = this.preferencias.indexOf(nome);
    if (i > -1) {
      this.preferencias.splice(i, 1); // desmarca
    } else if (this.preferencias.length < 3) {
      this.preferencias.push(nome); // marca
    }
  }

  enviarPreferencias() {
    console.log('Preferências selecionadas:', this.preferencias);
    if (this.etapaAtual < this.totalEtapas) {
      this.etapaAtual++;
    }
  }

  // Etapas
  voltar() {
    if (this.etapaAtual > 1) {
      this.etapaAtual--;
    } else {
      this.navCtrl.back();
    }
  }

  proximo() {
    if (this.etapaAtual < this.totalEtapas) {
      this.etapaAtual++;
    }
  }

  getProgresso(): string {
    const porcentagem = (this.etapaAtual / this.totalEtapas) * 100;
    return `${porcentagem}%`;
  }

  // Etapa tipo de pele
  selecionarCampo(campo: 'tipo' | 'sensibilidade' | 'tom', valor: string) {
  this.pele[campo] = valor;
}


  toggleCondicao(condicao: string) {
    const index = this.pele.condicoes.indexOf(condicao);
    if (index > -1) {
      this.pele.condicoes.splice(index, 1);
    } else {
      this.pele.condicoes.push(condicao);
    }
  }



  async entrar() {

    try{
      // cria o objeto com os dados do formulario
      const dadosUsuario: DadosFormulario = {
        preferencias: this.preferencias,
        pele: this.pele
      };

      // salva os dados no storage
      const idUsuario = await this.sugestoesService.salvarDadosFormulario(dadosUsuario);
      console.log('Dados do formulário salvos com ID:', idUsuario);

      await this.modal.dismiss();
      this.navCtrl.navigateRoot('/tela-login');
    } catch (error) {
      console.error('Erro ao salvar os dados do formulário:', error);
      // adicionar um alerta de erro para o usuario
    }
  }

  ionViewWillEnter() {
    this.presentingElement = document.querySelector('ion-content');
  }
}
