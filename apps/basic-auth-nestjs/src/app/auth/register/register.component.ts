import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: null,
    password: null,
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  onSubmit(): void {
    this.authService.register(this.registerForm.value).subscribe(console.log);
  }
}
