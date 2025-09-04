import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: false
})
export class CameraPage implements AfterViewInit{
  @ViewChild('video', {static: false}) videoElement!: ElementRef<HTMLVideoElement>;
  imagemCapturada: string | null = null;

constructor(private modalCtrl: ModalController) {}

async ngAfterViewInit(){
  try{
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false,
    });
    
    const video = this.videoElement.nativeElement;
    video.srcObject = stream;

    video.style.transform = 'scaleX(-1)';
  } catch (err) {
    console.error('Erro ao acessar a câmera:', err);
  }
}

capturarImagem(){
  const video = this.videoElement.nativeElement;

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight

  const context = canvas.getContext('2d');
  if(context){

    context.translate(canvas.width, 0);
    context.scale(-1,1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.imagemCapturada = canvas.toDataURL('image/jpeg');

    /*                  ******** EXPLICAÇÃO *******                           */
    //para acessar a foto no servidor backend (mongoDB) é necessária a conversão da imagemBase64 para um File!
    const base64paraBlob = (base64: string, mimeType: string) => {
      /*
      o parâmetro1 (base64) -> Imagem Base 64
        parâmetro2 (mimeType) -> Tipo do arquivo - .jpeg; .png - nesse caso: "image/jpeg"
      */
     
    const byteCaracteres = atob(base64.split(",")[1]); 
     /* função atob() -> usado para pegar somente o código da imagemBase64 -
        ex.: const base64String = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...";
        Decodifica base64, após a função atob(): "/9j/4AAQSkZJRgABAQAAAQ..."
    */
      const byteNumeros = new Array(byteCaracteres.length)
      // array vazio com o tamanho da string binária 
      
      
      /*
        Para cada caracter da string binária{
        Obtém o código ASSCI/Unicode de cada caracter, seguindo a incrementação, para armazenar o 
        código no array "byteNumeros"
        }
      
      */
      for( let i = 0; i< byteCaracteres.length; i++){
        byteNumeros[i] = byteCaracteres.charCodeAt(i); 
      }

      const byteArray = new Uint8Array(byteNumeros);
      return new Blob([byteArray], {type: mimeType});
    }
    const blob = base64paraBlob(this.imagemCapturada, 'imagem/jpeg')
    const file = new File([blob], 'foto_camera.joeg', {type: 'image/jpeg'})
  }
}

fechar() {
  const video = this.videoElement?.nativeElement;
  const stream = video?.srcObject as MediaStream;
  stream?.getTracks().forEach((track) => track.stop());

  this.modalCtrl.dismiss();
}

descartarImagem() {
  this.imagemCapturada = null;
}

async confirmarFoto() {
  const data = {
    imagem: this.imagemCapturada
  };

  await this.modalCtrl.dismiss(data);
}
}
