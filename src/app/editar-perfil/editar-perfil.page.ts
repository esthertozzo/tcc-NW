import { Component, OnInit } from '@angular/core';
import { ProfileService, UpdateProfilePayload } from '../services/profile.service'
import { AuthService } from '../services/auth/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: false
})
export class EditarPerfilPage implements OnInit {
  nome: string = '';
  email: string = '';
  senha: string = '';
  data: string = '';

  isSubmitting: boolean = false;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    // Verifica se o usuário está autenticado
    if (!this.authService.isAuthenticated()) {
      this.mostrarErroAutenticacao();
      return;
    }

    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.nome = usuario.nome || '';
      this.email = usuario.email || '';
    }
  }

  private async mostrarErroAutenticacao() {
    const toast = await this.toastController.create({
      message: 'Usuário não autenticado. Faça login novamente.',
      duration: 3000,
      color: 'danger'
    });
    await toast.present();
    this.router.navigate(['/tela-login']);
  }

  async salvarAlteracoes() {
    if (this.isSubmitting) return;

    // Verifica novamente se está autenticado
    if (!this.authService.isAuthenticated()) {
      await this.mostrarErroAutenticacao();
      return;
    }

    // Validação básica
    if (!this.nome.trim()) {
      const toast = await this.toastController.create({
        message: 'Nome é obrigatório',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    if (!this.email.trim()) {
      const toast = await this.toastController.create({
        message: 'Email é obrigatório',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    this.isSubmitting = true;

    const usuario = this.authService.getUsuario();
    if (!usuario?.id) {
      this.isSubmitting = false;
      const toast = await this.toastController.create({
        message: 'Usuário não identificado. Faça login novamente.',
        duration: 3000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    const payload: UpdateProfilePayload = {
      id: usuario.id,
      nome: this.nome.trim(),
      email: this.email.trim(),
      senha: this.senha,
      data: this.data,
    };

    this.profileService.updateProfile(payload).subscribe({
      next: async (response) => {
        this.isSubmitting = false;

        // Atualiza os dados do usuário na sessão
        if (usuario) {
          usuario.nome = this.nome.trim();
          usuario.email = this.email.trim();

          // Atualiza o localStorage
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        }

        const toast = await this.toastController.create({
          message: 'Perfil atualizado com sucesso',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        this.navCtrl.navigateBack('/tela-perfil');
      },
      error: async (error) => {
        this.isSubmitting = false;

        let errorMessage = 'Erro ao atualizar o perfil';
        if (error.status === 401) {
          errorMessage = 'Sessão expirada. Faça login novamente.';
          this.authService.logout();
        } else if (error.status === 404) {
          errorMessage = 'Usuário não encontrado';
        } else if (error.status === 500) {
          errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        const toast = await this.toastController.create({
          message: errorMessage,
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
        console.error('Erro update profile:', error);
      }
    });
  }

  onDateChange(event: any) {
    const value = event.detail?.value;
    // Normaliza para string ISO curta (AAAA-MM-DD) se vier Date ou ISO completa
    if (!value) {
      this.data = '';
      return;
    }
    if (typeof value === 'string') {
      // value pode ser ISO completo; extrai a parte de data
      const onlyDate = value.includes('T') ? value.split('T')[0] : value;
      this.data = onlyDate;
      return;
    }
    try {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        this.data = `${yyyy}-${mm}-${dd}`;
      }
    } catch {
      this.data = '';
    }
  }
}
