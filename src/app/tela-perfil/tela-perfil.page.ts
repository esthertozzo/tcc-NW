import { AuthService } from './../services/auth/auth.service';
import { Component, ViewChild} from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { CameraPage } from '../camera/camera.page';
import { EditarPerfilModalComponent } from '../components/editar-perfil-modal/editar-perfil-modal.component';
import { PoliticasModalComponent } from '../components/politicas-modal/politicas-modal.component';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.page.html',
  styleUrls: ['./tela-perfil.page.scss'],
  standalone: false,
})
export class TelaPerfilPage {
  @ViewChild(IonModal) modal!: IonModal;
  presentingElement: any;
  canDismiss = true;

  fotoBase64: string | null = null;
  midias: File[] = [];
  previews: { type: 'foto' | 'video', url: string }[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {}

  get profilePhotoUrl(): string | null {
    if (this.previews.length > 0) {
      return this.previews[this.previews.length - 1].url;
    }
    return this.fotoBase64;
  }


async editarPerfil() {
  const modal = await this.modalCtrl.create({
    component: EditarPerfilModalComponent,
  });
  await modal.present();
}

async politicas(){
  const modal = await this.modalCtrl.create({
    component: PoliticasModalComponent
  });
  await modal.present();
}
  async abrirOpcoes() {
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
            this.selecionarFotos();
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
  const modal = await this.modalCtrl.create({
    component: CameraPage,
    cssClass: 'camera-modal',
    showBackdrop: true,
  });

  modal.onDidDismiss().then((result) => {
    if (result.data && result.data.imagem) {
      console.log('Imagem recebida:', result.data.imagem);

      // Se a imagem voltar como base64:
      // this.previews.push({ type: 'foto', url: 'data:image/jpeg;base64,' + result.data.imagem });

      // OU, se você já estiver passando como URL:
      this.previews.push({ type: 'foto', url: result.data.imagem });

      // Se você precisar também do File para o postService:
      // Exemplo se tiver Blob:
      /*
      const blob = this.base64ToBlob(result.data.imagem, 'image/jpeg');
      const file = new File([blob], 'foto_camera.jpg', { type: 'image/jpeg' });
      this.midias.push(file);
      */
    }
  });

  return await modal.present();
}


  selecionarFotos() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.onchange = () => {
      const arquivos = input.files!;
      for (let i = 0; i < arquivos.length; i++) {
        const file = arquivos[i];
        this.midias.push(file);
        this.previews.push({ type: 'foto', url: URL.createObjectURL(file) });
      }
      if (this.previews.length > 0) {
        this.fotoBase64 = null;
      }
    };

    input.click();
  }

  ionViewWillEnter() {
    this.presentingElement = document.querySelector('ion-content');
  }

  planos(){
    this.navCtrl.navigateForward('/tela-planos')
  }

  logout() {
    this.authService.logout();
  }

  voltar() {
    this.navCtrl.back();
  }
}
