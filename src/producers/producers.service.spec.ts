import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  CropType,
  ProducerCropPlanted,
} from './entities/producer-crop-planted.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { BadRequestException } from '@nestjs/common';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  save: jest.fn((entity) => entity),
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

  it('should throw when the create method is called and the sum of the arable and vegetation areas are greater than the total area', async () => {
    const params: CreateProducerDto = {
      name: 'any-producer-name',
      farmName: 'any-farm-name',
      stateInitials: 'SP',
      city: 'São Paulo',
      cropsPlanted: [CropType.SOJA],
      document: {
        type: 'cpf',
        cpf: '11111111111',
      },
      arableArea: 26,
      vegetationArea: 30,
      totalArea: 50,
    };

    await expect(() => service.create(params)).rejects.toThrowError(
      BadRequestException,
    );
  });

  it('should call the producers repository if nothing goes wrong and the params are correct', async () => {
    const params: CreateProducerDto = {
      name: 'any-producer-name',
      farmName: 'any-farm-name',
      stateInitials: 'SP',
      city: 'São Paulo',
      cropsPlanted: [CropType.SOJA],
      document: {
        type: 'cpf',
        cpf: '11111111111',
      },
      arableArea: 26,
      vegetationArea: 30,
      totalArea: 60,
    };

    const repositorySpy = jest.spyOn(repositoryMock, 'save');

    await service.create(params);

    expect(repositorySpy).toHaveBeenCalled();
  });
});
