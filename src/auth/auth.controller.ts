import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignedUpUser } from './interface/signedup-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() { email, password }: SignUpDTO): Promise<SignedUpUser> {
    return this.authService.signUp(email, password);
  }
}
