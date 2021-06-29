import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<void> {
    const { username, password } = authRegisterDto;
    const user = await this.usersRepository.findOne({ username });

    if (user) throw new ConflictException('Username already exists');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.usersRepository.createUser({
      username,
      password: hashedPassword,
    });
  }

  async login(authLoginDto: AuthLoginDto): Promise<User> {
    const { username, password } = authLoginDto;
    const user = await this.usersRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new UnauthorizedException();

    delete user.password;
    return user;
  }

  async getJwtCookie(username: string): Promise<string> {
    const payload: JwtPayload = { username };
    const accessToken: string = this.jwtService.sign(payload);
    const expiresIn = this.configService.get<number>('auth.jwt.expiresIn');
    return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
  }

  async getLogoutCookie(): Promise<string> {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
