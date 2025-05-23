import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerCropPlanted } from './entities/producer-crop-planted.entity';
import { Producer } from './entities/producer.entity';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private producersRepository: Repository<Producer>,
    @InjectRepository(ProducerCropPlanted)
    private cropPlantedRepository: Repository<ProducerCropPlanted>,
  ) {}

  async create(producerDto: CreateProducerDto): Promise<Producer> {
    if (
      producerDto.arableArea + producerDto.vegetationArea >
      producerDto.totalArea
    )
      throw new BadRequestException(
        'The sum of arable and vegetation areas should not be greater than total area.',
      );

    const producer: Producer = this.producersRepository.create({
      ...producerDto,
      cropsPlanted: producerDto.cropsPlanted.map((cropPlanted) =>
        this.cropPlantedRepository.create({ cropPlanted }),
      ),
      documentType: producerDto.document.type,
      documentValue: producerDto.document[producerDto.document.type],
    });

    return this.producersRepository.save(producer);
  }

  async findAll() {
    const allProducers = await this.producersRepository.find({
      relations: ['cropsPlanted'],
    });

    return allProducers.map(({ cropsPlanted, ...producer }) => ({
      ...producer,
      cropsPlanted: cropsPlanted.reduce(
        (prev, curr) => [...prev, curr.cropPlanted],
        [],
      ),
    }));
  }

  async findByName(name: string): Promise<Array<Producer>> {
    return this.producersRepository
      .createQueryBuilder('producer')
      .where('producer.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  async findOne(id: string): Promise<Producer> {
    return this.producersRepository.findOne({
      where: { id },
      relations: ['cropsPlanted'],
    });
  }

  async update(
    id: string,
    updateProducerDto: UpdateProducerDto,
  ): Promise<Producer> {
    let currentProducer = await this.producersRepository.findOne({
      where: { id },
      relations: ['cropsPlanted'],
    });

    if (!currentProducer)
      throw new BadRequestException('The passed id must be a valid one.');

    const currentTotalArea =
      updateProducerDto.totalArea || currentProducer.totalArea;
    const currentArableArea =
      updateProducerDto.arableArea || currentProducer.arableArea;
    const currentVegetationArea =
      updateProducerDto.vegetationArea || currentProducer.vegetationArea;

    if (currentArableArea + currentVegetationArea > currentTotalArea)
      throw new BadRequestException(
        'The sum of arable and vegetation areas should not be greater than total area.',
      );

    const documentType =
      updateProducerDto.document?.type || currentProducer.documentType;
    const documentValue = updateProducerDto.document?.type
      ? updateProducerDto.document[documentType]
      : currentProducer.documentValue;

    currentProducer = {
      ...currentProducer,
      name: updateProducerDto.name || currentProducer.name,
      documentType,
      documentValue,
      farmName: updateProducerDto.farmName || currentProducer.farmName,
      city: updateProducerDto.city || currentProducer.city,
      stateInitials:
        updateProducerDto.stateInitials || currentProducer.stateInitials,
      totalArea: currentTotalArea,
      arableArea: currentArableArea,
      vegetationArea: currentVegetationArea,
    };

    if (updateProducerDto.cropsPlanted) {
      const newCropsPlanted: Array<ProducerCropPlanted> =
        updateProducerDto.cropsPlanted.map((cropPlanted) =>
          this.cropPlantedRepository.create({ cropPlanted }),
        );

      currentProducer.cropsPlanted = newCropsPlanted;
    }

    return this.producersRepository.save(currentProducer);
  }

  async deleteOneById(id: string) {
    const foundProducer = this.producersRepository.findOne({ where: { id } });

    if (!foundProducer) throw new NotFoundException('Producer not found.');

    const transactionResult =
      await this.cropPlantedRepository.manager.transaction<DeleteResult>(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.delete(ProducerCropPlanted, {
            producer: { id },
          });
          return transactionalEntityManager.delete(Producer, id);
        },
      );

    if (transactionResult.affected === 0) throw new ConflictException();
  }

  async getDashboardData() {
    const { farmsTotalHectares } = await this.producersRepository
      .createQueryBuilder('producer')
      .select('SUM(producer.totalArea)', 'farmsTotalHectares')
      .getRawOne();

    const farmsByState = await this.producersRepository
      .createQueryBuilder('producer')
      .select('producer.stateInitials, COUNT(producer.stateInitials)')
      .groupBy('producer.stateInitials')
      .getRawMany();

    return {
      farmsTotalQuatity: await this.producersRepository.count(),
      farmsTotalHectares: parseFloat(Number(farmsTotalHectares).toFixed(2)),
      farmsByState: farmsByState,
    };
  }
}
