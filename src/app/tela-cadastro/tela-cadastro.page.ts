import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'
import { Keyboard } from '@capacitor/keyboard';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.page.html',
  styleUrls: ['./tela-cadastro.page.scss'],
  standalone: false
})
export class TelaCadastroPage implements OnInit {
  nome : string = '';
  email : string = '';
  senha : string = ''

  constructor(private navCtrl: NavController, private auth: AuthService, private http: HttpClient) {}
  ngOnInit() {
  }

  cadastrar(){
    if (!this.nome.trim() || !this.email.trim() || !this.senha.trim()) {
      console.error('Todos os campos são obrigatórios');
      return;
    }

    console.log('Nome:', this.nome);
    console.log('Email:', this.email);
    
    const usuario = {
      nome: this.nome.trim(),
      email: this.email.trim(),
      senha: this.senha
    };

    this.auth.cadastrar(usuario).subscribe({
      next: (res: any) => {
        console.log('Usuário cadastrado com sucesso!', res);
        if (res.success) {
          this.navCtrl.navigateForward('/tela-formulario');
        }
      },
      error: (err) => {
        console.error('Erro ao cadastrar', err);
        let mensagem = 'Erro ao cadastrar usuário';
        if (err.error?.message) {
          mensagem = err.error.message;
        }
        alert(mensagem);
      }
    });
  }
  /*cadastrar(){
    const usuario={
      nome: this.nome,
      email: this.email,
      senha: this.senha
    }
    fetch('http//localhost:3000/tela-cadastro',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })
    .then((res) => res.json())
    .then((resultado)=>{
      console.log(resultado.mensagem);
      this.navCtrl.navigateForward('/tela-formulario');
    })
    .catch((erro)=>{
      console.error('Erro no cadastro:', erro);
    });
  }*/
  login(){
  this.navCtrl.navigateForward('/tela-login');

  }
}

