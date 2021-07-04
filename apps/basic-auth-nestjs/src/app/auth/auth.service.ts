import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private readonly BASE_URL = 'http://localhost:3333/api/auth';
  private readonly BASE_URL = '/api/auth';

  constructor(private httpClient: HttpClient) {}

  login(login: AuthLoginDto): Observable<any> {
    return this.httpClient.post<void>(`${this.BASE_URL}/login`, login);
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(`${this.BASE_URL}/logout`, null);
  }
}
