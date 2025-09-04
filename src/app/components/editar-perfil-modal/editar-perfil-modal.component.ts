import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProfileService, UpdateProfilePayload } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-editar-perfil-modal',
  templateUrl: './editar-perfil-modal.component.html',
  styleUrls: ['./editar-perfil-modal.component.scss'],
  standalone: false
})
export class EditarPerfilModalComponent implements OnInit {
  @Input() userData: any;

  nome: string = '';
  email: string = '';
  senha: string = '';
  data: string = '';
  id: string = '';

  isSubmitting: boolean = false;

  constructor(
    private profileService: ProfileService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.mostrarErroAutenticacao();
      return;
    }

    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.nome = usuario.nome;
      this.email = usuario.email;
      this.id = usuario.id;
    }
  }

  async showToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  async mostrarErroAutenticacao() {
    await this.showToast('Você precisa estar autenticado para editar o perfil.', 'danger');
    this.fecharModal();
  }

  fecharModal(dadosAtualizados?: { nomeAtualizado?: string; emailAtualizado?: string }) {
    this.modalCtrl.dismiss(dadosAtualizados || null);
  }

  async salvarAlteracoes() {
    if (this.isSubmitting) return;

    if (!this.authService.isAuthenticated()) {
      await this.mostrarErroAutenticacao();
      return;
    }

    if (!this.nome.trim()) {
      await this.showToast('Nome é obrigatório', 'warning');
      return;
    }

    if (!this.email.trim()) {
      await this.showToast('Email é obrigatório', 'warning');
      return;
    }

    this.isSubmitting = true;

    try {
      const payload: UpdateProfilePayload = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        id: this.id,
        data: this.data
      };

      await this.profileService.updateProfile(payload).toPromise();

       const usuario = this.authService.getUsuario();
      if (usuario) {
        const usuarioAtualizado = { ...usuario, nome: this.nome, email: this.email };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
        // Atualiza o BehaviorSubject para refletir no app inteiro
        (this.authService as any)['usuarioLogadoSubject'].next(usuarioAtualizado);
      }

      await this.showToast('Perfil atualizado com sucesso!', 'success');
      this.fecharModal({nomeAtualizado: this.nome});
    } catch (error) {
      console.error(error);
      await this.showToast('Erro ao atualizar perfil.', 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }
}

