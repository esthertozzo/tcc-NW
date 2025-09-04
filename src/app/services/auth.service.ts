import { Injectable } from '@angular/core';
import { SugestoesService } from './sugestoes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sugestoesService: SugestoesService) { }

  async logout(): Promise<void> {
    try{
      // limpa os dados do formulario do usuario atual
      await this.sugestoesService.limparDadosusuario();
      console.log('Dados do usuário limpos com sucesso.');
    }catch (error) {
      console.error('Erro ao limpar os dados do usuário:', error);
      throw error;
    }
  }

  async hasUserData(): Promise<boolean> {
    try{
      const dados = await this.sugestoesService.getDadosFormularioAtual();
      return dados !== null;
    }catch (error) {
      console.error('Erro ao verificar dados do usuário:', error);
      return false;
    }
  }
}
