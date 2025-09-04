import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, Usuario } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/tela-post';

  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  criarPost(descricao: string, fotos: File[]){

    const usuarioLogado = this.authService.getUsuario();

    if(!usuarioLogado){
      throw new Error('Usuário não está logado!');
    }

    // Usa o nome do usuário diretamente da interface Usuario
    const usuarioNome: string = usuarioLogado.nome;

    if(!usuarioNome){
      throw new Error('Nome de usuário não disponível para criar o post.');
    }

    const formData = new FormData();
    formData.append('usuario', usuarioNome);
    formData.append('descricao', descricao);

    fotos.forEach((foto) => {
      formData.append('fotos', foto);
    });

    return this.http.post(this.apiUrl, formData);
  };

  buscarPost(){
    return this.http.get(this.apiUrl);
  }
}
