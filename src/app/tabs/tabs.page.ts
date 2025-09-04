import { Component, OnInit } from '@angular/core';
import { AuthService, Usuario } from '../services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {
  fotoBase64: string | null = null;
  email: string = '';
  senha: string = '';
  usuarioLogado: Usuario | null = null;

  mostrarBotao = false;
  mostrarBotaoPlano = false;
  mostrarBotaoPost = false;
  mostrarBotaoCamera = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.verificarAutenticacao();
      }
    });
  }

  ngOnInit() {
    this.verificarAutenticacao();
  }

  private verificarAutenticacao() {
    // Verifica se o usuário está autenticado
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/tela-login']);
      return;
    }

    // Obtém dados do usuário logado
    this.usuarioLogado = this.auth.getUsuario();
    if (this.usuarioLogado) {
      this.email = this.usuarioLogado.email;
      this.senha = this.auth.senha; // Mantém a senha se estiver armazenada
    }

    console.log('Tabs - Usuário autenticado:', this.usuarioLogado);

    // verifica a URL atual para determinar quais botões mostrar
    const url = this.router.url;
    this.mostrarBotao = url.includes('tab1');
    this.mostrarBotaoPlano = url.includes('tab1');
    this.mostrarBotaoCamera = url.includes('tab2');
    this.mostrarBotaoPost = url.includes('tab3');
  }

  perfil() {
    console.log('Clicado');
    this.navCtrl.navigateForward('/tela-perfil');
  }

  planos() {
    console.log('Clicado');
    this.navCtrl.navigateRoot('/tela-planos');
  }

  post() {
    console.log('Clicado');
    this.navCtrl.navigateRoot('/tela-post');
  }

  logout() {
    this.auth.logout();
  }

  isMobile(): boolean {
    return Capacitor.getPlatform() !== 'web';
  }

 async abrirFoto(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecionar foto de perfil',
      buttons: [
        {
          text: 'Tirar Foto',
          icon: 'camera',
          handler: () => {
            this.tirarFoto();
          },
        },
        {
          text: 'Escolher da Galeria',
          icon: 'image',
          handler: () => {
            this.escolherDaGaleria();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
  async tirarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera // Abre a câmera
    });

    this.fotoBase64 = 'data:image/jpeg;base64,' + image.base64String;
  }

  // Selecionar imagem da galeria
  async escolherDaGaleria() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos // Abre a galeria
    });

    this.fotoBase64 = 'data:image/jpeg;base64,' + image.base64String;
  }

  // para barra de navegacao inferior
  isActive(tab: string): boolean {
    return this.router.url.includes(tab);
  }
}
