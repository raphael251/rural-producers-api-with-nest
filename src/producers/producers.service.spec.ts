import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProducerCropPlanted } from './entities/producer-crop-planted.entity';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe('ProducersService', () => {
  let service: ProducersService;
  let repositoryMock: MockType<Repository<Producer>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ProducersService>(ProducersService);
    repositoryMock = module.get(getRepositoryToken(Producer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
