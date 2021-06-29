import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { AccessToken } from './jwt/access-token.interface';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService
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

  async login(authLoginDto: AuthLoginDto): Promise<AccessToken> {
    const { username, password } = authLoginDto;
    const user = await this.usersRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new UnauthorizedException();

    const payload: JwtPayload = { username };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
