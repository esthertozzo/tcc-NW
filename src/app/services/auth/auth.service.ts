import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface Usuario {
  id: string;
  email: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  public email: string = '';
  public senha: string = '';

  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Verifica se há usuário salvo no localStorage ao inicializar
    this.verificarSessaoSalva();
  }

  private verificarSessaoSalva() {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      try {
        const usuario = JSON.parse(usuarioSalvo);
        this.usuarioLogadoSubject.next(usuario);
        console.log('Sessão restaurada:', usuario);
      } catch (error) {
        console.error('Erro ao restaurar sessão:', error);
        localStorage.removeItem('usuarioLogado');
      }
    }
  }

  cadastrar(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tela-cadastro`, dados);
  }

  login(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tela-login`, dados, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          const usuario: Usuario = {
            id: response.id,
            email: response.email,
            nome: response.nome,
          };

          // Salva no localStorage para persistir a sessão
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

          // Atualiza o BehaviorSubject
          this.usuarioLogadoSubject.next(usuario);

          console.log('Usuario logado:', usuario);
        })
      );
  }

  getUsuario(): Usuario | null {
    return this.usuarioLogadoSubject.value;
  }

  isAuthenticated(): boolean {
    return this.usuarioLogadoSubject.value !== null;
  }

  logout() {
    // Remove do localStorage
    localStorage.removeItem('usuarioLogado');

    // Limpa o BehaviorSubject
    this.usuarioLogadoSubject.next(null);

    // Redireciona para login
    this.router.navigate(['/tela-login']);

    console.log('Usuário deslogado');
  }

  // Método para verificar se a sessão ainda é válida no servidor
  verificarSessao(): Observable<any> {
    return this.http.get(`${this.apiUrl}/verificar-sessao`, { withCredentials: true });
  }
}
