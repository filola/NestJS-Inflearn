import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentalsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(AuthCredentalsDto: AuthCredentalsDto): Promise<void> {
    const { username, password } = AuthCredentalsDto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
