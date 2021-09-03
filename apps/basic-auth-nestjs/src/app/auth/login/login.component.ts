import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: null,
    password: null,
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService
      .login(this.loginForm.value)
      .pipe(
        catchError(({ error }) => {
          this.snackBar.open(error.message, 'CLOSE', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl('/customer');
      });
  }
}
