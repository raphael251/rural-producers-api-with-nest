import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProducerCropPlanted } from './entities/producer-crop-planted.entity';
import { Producer } from './entities/producer.entity';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe('ProducersController', () => {
  let producersController: ProducersController;
  let producersService: ProducersService;

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
      ],
    }).compile();

    producersController = module.get<ProducersController>(ProducersController);
    producersService = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(producersController).toBeDefined();
  });
});
