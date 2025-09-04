import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'
import { Keyboard } from '@capacitor/keyboard';
import { NavController, ToastController } from '@ionic/angular';

Keyboard.setScroll({ isDisabled: false });

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.page.html',
  styleUrls: ['./tela-login.page.scss'],
  standalone: false
})
export class TelaLoginPage {
  email = '';
  senha = '';
  isLoading = false;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private toastController: ToastController
  ) { }

  // Método removido - não deve permitir navegação sem autenticação
  // Tabs() {
  //   this.auth.email = this.email;
  //   this.auth.senha = this.senha;
  //   this.navCtrl.navigateForward('/tabs');
  // }

  cadastro() {
    this.navCtrl.navigateForward('/tela-cadastro')
  }

  async login() {
    // Validação básica
    if (!this.email.trim() || !this.senha.trim()) {
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    this.isLoading = true;

    const dados = {
      email: this.email.trim(),
      senha: this.senha
    };

    this.auth.login(dados).subscribe({
      next: async (res) => {
        this.isLoading = false;
        console.log('Login bem-sucedido:', res);

        // Armazena email e senha para uso posterior se necessário
        this.auth.email = this.email;
        this.auth.senha = this.senha;

        // Navega para as tabs após login bem-sucedido
        this.navCtrl.navigateForward('/tabs');
      },
      error: async (erro) => {
        this.isLoading = false;
        console.error('Erro no login: ', erro);

        let mensagem = 'Erro ao fazer login. Tente novamente.';
        if (erro.status === 401) {
          mensagem = 'Email ou senha incorretos.';
        } else if (erro.error?.message) {
          mensagem = erro.error.message;
        }

        const toast = await this.toastController.create({
          message: mensagem,
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}
