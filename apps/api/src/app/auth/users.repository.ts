import { EntityRepository, Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authRegisterDto: AuthRegisterDto): Promise<void> {
    const user = this.create(authRegisterDto);
    await this.save(user);
  }
}
