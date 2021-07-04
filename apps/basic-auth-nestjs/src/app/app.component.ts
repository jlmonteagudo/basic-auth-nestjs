import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'basic-auth-nestjs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe();
  }
}
