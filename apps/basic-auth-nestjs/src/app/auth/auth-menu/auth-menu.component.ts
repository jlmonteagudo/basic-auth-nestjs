import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css'],
})
export class AuthMenuComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe();
  }
}
