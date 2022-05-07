import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Producer } from './producers/entities/producer.entity';
import { ProducersModule } from './producers/producers.module';
import 'dotenv/config';
import { ProducerCropPlanted } from './producers/entities/producer-crop-planted.entity';

@Module({
  imports: [
    ProducersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Producer, ProducerCropPlanted],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
