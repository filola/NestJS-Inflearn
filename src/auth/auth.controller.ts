import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentalsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentalsDto: AuthCredentalsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentalsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentalsDto: AuthCredentalsDto) {
    return this.authService.signIn(authCredentalsDto);
  }
}
