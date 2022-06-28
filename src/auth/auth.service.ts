import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentalsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private UserRepository: UserRepository,
  ) {}

  async signUp(AuthCredentalsDto: AuthCredentalsDto): Promise<void> {
    return this.UserRepository.createUser(AuthCredentalsDto);
  }
}
