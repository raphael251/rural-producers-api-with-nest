import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { HashingService } from './hashing.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashingService],
  imports: [UsersModule],
})
export class AuthModule {}
