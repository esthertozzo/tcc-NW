import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CameraPage } from '../camera/camera.page';
import { AnaliseFacialService } from '../services/facial-analisys/analise-facial.service'

@Component({
  selector: 'app-tab2_reconhecimento-facial',
  templateUrl: 'tab2_reconhecimento-facial.page.html',
  styleUrls: ['tab2_reconhecimento-facial.page.scss'],
  standalone: false
})
export class Tab2ReconhecimentoFacialPage {

  constructor(
    private modalCtrl: ModalController,
    private analiseFacial: AnaliseFacialService
  ) {}

  async openCameraModal(){
    const modal = await this.modalCtrl.create({
      component: CameraPage,
      cssClass: 'camera-modal',
      showBackdrop: true
    });
    return await modal.present();
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
     // this.previews.push({ type: 'foto', url: result.data.imagem });

      // Se você precisar também do File para o postService:
      // Exemplo se tiver Blob:
      /*
      const blob = this.base64ToBlob(result.data.imagem, 'image/jpeg');
      const file = new File([blob], 'foto_camera.jpg', { type: 'image/jpeg' });
      this.midias.push(file);
      */
    }
  });
}

}
