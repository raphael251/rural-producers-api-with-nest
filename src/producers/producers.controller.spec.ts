import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProducerCropPlanted } from './entities/producer-crop-planted.entity';
import { Producer } from './entities/producer.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe('ProducersController', () => {
  let producersController: ProducersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        ProducersService,
        {
          provide: getRepositoryToken(Producer),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(ProducerCropPlanted),
          useFactory: repositoryMockFactory,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
            decode: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    producersController = module.get<ProducersController>(ProducersController);
  });

  it('should be defined', () => {
    expect(producersController).toBeDefined();
  });
});
