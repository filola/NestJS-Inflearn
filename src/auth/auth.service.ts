import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentalsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private UserRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(AuthCredentalsDto: AuthCredentalsDto): Promise<void> {
    return this.UserRepository.createUser(AuthCredentalsDto);
  }

  async signIn(
    authCredentalsDto: AuthCredentalsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentalsDto;
    const user = await this.UserRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('login Failed');
    }
  }
}
