import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-politicas-modal',
  templateUrl: './politicas-modal.component.html',
  styleUrls: ['./politicas-modal.component.scss'],
  standalone: false
})
export class PoliticasModalComponent  implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

    fecharModal() {
    this.modalCtrl.dismiss();
  }
}
