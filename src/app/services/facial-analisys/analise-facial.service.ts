import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AnaliseFacialService {

  constructor(private http : HttpClient) { }
  enviarFotoParaAnalise(imagemBase64: string){
    return this.http.post('http://localhost:3000/analise-facial', {
      imagem:imagemBase64,
    });
  }
}
