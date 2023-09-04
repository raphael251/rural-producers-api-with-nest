import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignedUpUser } from './interface/signedup-user.interface';
import { SignInDTO } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() { email, password }: SignUpDTO): Promise<SignedUpUser> {
    return this.authService.signUp(email, password);
  }

  @Post('signin')
  async signIn(@Body() { email, password }: SignInDTO): Promise<any> {
    return this.authService.signIn(email, password);
  }
}
