import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { PostService } from '../services/post/post.service';
import { CameraPage } from '../camera/camera.page';

@Component({
  selector: 'app-tela-post',
  templateUrl: './tela-post.page.html',
  styleUrls: ['./tela-post.page.scss'],
  standalone: false
})
export class TelaPostPage implements OnInit {

  descricao = '';
  midias: File[] = [];
  previews: { type: 'foto' | 'video', url: string }[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private postService: PostService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  publicar() {
    this.postService.criarPost(this.descricao, this.midias).subscribe({
      next: () => {
        console.log('Post enviado com sucesso!');
        this.descricao = '';
        this.midias = [];
        this.previews.forEach(p => URL.revokeObjectURL(p.url));
        this.previews = [];
      },
      error: (err) => {
        console.error('Erro ao enviar post:', err);
      }
    });
  }

  async abrirOpcoesMidia() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Adicionar mídia',
      buttons: [
        {
          text: 'Tirar Foto',
          icon: 'camera',
          handler: () => this.tirarFoto(),
        },
        {
          text: 'Escolher Fotos da Galeria',
          icon: 'images',
          handler: () => this.selecionarFotos(),
        },
        {
          text: 'Selecionar Vídeo',
          icon: 'videocam',
          handler: () => this.selecionarVideo(),
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        }
      ]
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
    };

    input.click();
  }

  selecionarVideo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';

    input.onchange = () => {
      const file = input.files![0];
      if (file) {
        this.midias.push(file);
        this.previews.push({ type: 'video', url: URL.createObjectURL(file) });
      }
    };

    input.click();
  }

  onDescricaoChange(event: any) {
    let texto = event.target.value;
    if (texto.length > 2200) {
      texto = texto.substring(0, 2200);
    }
    this.descricao = texto;
  }
}
