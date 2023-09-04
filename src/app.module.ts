import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './producers/entities/producer.entity';
import { ProducersModule } from './producers/producers.module';
import 'dotenv/config';
import { ProducerCropPlanted } from './producers/entities/producer-crop-planted.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entites/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProducersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [User, Producer, ProducerCropPlanted],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
