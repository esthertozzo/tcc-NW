import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss'],
  standalone: false
})
export class TelaInicialPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  
  }

  entrar(){
  this.navCtrl.navigateForward('/onboarding');

  }
}
