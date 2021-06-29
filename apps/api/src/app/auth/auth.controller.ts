import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessToken } from './jwt/access-token.interface';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() authRegisterDto: AuthRegisterDto): Promise<void> {
    return this.authService.register(authRegisterDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() authLoginDto: AuthLoginDto): Promise<AccessToken> {
    return this.authService.login(authLoginDto);
  }
}
