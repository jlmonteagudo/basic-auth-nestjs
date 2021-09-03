import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { UiModule } from '../ui/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AuthMenuComponent } from './auth-menu/auth-menu.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthMenuComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
  ],
  exports: [AuthMenuComponent],
})
export class AuthModule {}
