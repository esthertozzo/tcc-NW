import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3_comunidade',
  templateUrl: 'tab3_comunidade.page.html',
  styleUrls: ['tab3_comunidade.page.scss'],
  standalone: false,
})
export class Tab3ComunidadePage {

  constructor(public router: Router) {}

  post(){
    this.router.navigate(['/tela-post']);
  }
}
