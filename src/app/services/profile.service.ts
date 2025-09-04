import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UpdateProfilePayload {
  id: string;
  nome: string;
  email: string;
  senha: string;
  data: string;
  preferencias?: any;
  plano?: any;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly apiBaseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  updateProfile(payload: UpdateProfilePayload): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/editar-perfil`, payload, { withCredentials: true });
  }
}

