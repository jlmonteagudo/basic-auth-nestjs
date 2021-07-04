import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'basic-auth-nestjs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: null,
    password: null,
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(console.log);
  }
}
