import { BadRequestException, Injectable } from '@nestjs/common';
import { SignedUpUser } from './interface/signedup-user.interface';
import { UsersService } from '../users/users.service';
import { HashingService } from './hashing.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}
  async signUp(email: string, password: string): Promise<SignedUpUser> {
    const foundUser = await this.usersService.findOneByEmail(email);

    if (foundUser)
      throw new BadRequestException(
        'This e-mail is already registered for an user.',
      );

    const hashedPassword = await this.hashingService.hash(password);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
    };
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new BadRequestException('Invalid e-mail or password.');

    const isThePasswordCorrect = await this.hashingService.compare(
      password,
      user.password,
    );

    if (!isThePasswordCorrect)
      throw new BadRequestException('Invalid e-mail or password.');

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
