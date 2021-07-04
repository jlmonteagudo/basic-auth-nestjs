import {
  Controller,
  Post,
  Body,
  HttpCode,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import JwtAuthenticationGuard from './jwt/jwt-authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() authRegisterDto: AuthRegisterDto): Promise<void> {
    return this.authService.register(authRegisterDto);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  async login(@Body() authLoginDto: AuthLoginDto, @Res() response: Response) {
    const user = await this.authService.login(authLoginDto);
    const cookie = await this.authService.getJwtCookie(user.username);

    response.setHeader('Set-Cookie', cookie);
    response.send(user);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res() response: Response): Promise<void> {
    const cookie = await this.authService.getLogoutCookie();
    response.setHeader('Set-Cookie', cookie);
    response.send();
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getPrivateData() {
    return { message: 'THIS IS PRIVATE DATA' };
  }
}
