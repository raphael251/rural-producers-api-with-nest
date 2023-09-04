import { BadRequestException, Injectable } from '@nestjs/common';
import { SignedUpUser } from './interface/signedup-user.interface';
import { UsersService } from '../users/users.service';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashingService: HashingService,
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
}
