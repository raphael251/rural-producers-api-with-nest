import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerCropPlanted } from './entities/producer-crop-planted.entity';
import { Producer } from './entities/producer.entity';
import { BusinessError } from '../errors/business.error';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private producersRepository: Repository<Producer>,
    @InjectRepository(ProducerCropPlanted)
    private producersCropPlantedRepository: Repository<ProducerCropPlanted>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    if (
      createProducerDto.arableArea + createProducerDto.vegetationArea >
      createProducerDto.totalArea
    )
      throw new BusinessError(
        'the sum of arable and vegetation areas should not be greater than total area',
      );

    const producer = new Producer();

    const cropsPlanted: Array<ProducerCropPlanted> = [];

    for (const crop of createProducerDto.cropsPlanted) {
      const cropPlanted = new ProducerCropPlanted();
      cropPlanted.cropPlanted = crop;
      cropsPlanted.push(cropPlanted);
    }

    const documentType = createProducerDto.document.type;
    producer.documentType = documentType;
    producer.documentValue = createProducerDto.document[documentType];

    producer.name = createProducerDto.name;
    producer.farmName = createProducerDto.farmName;
    producer.city = createProducerDto.city;
    producer.stateInitials = createProducerDto.stateInitials;
    producer.totalArea = createProducerDto.totalArea;
    producer.arableArea = createProducerDto.arableArea;
    producer.vegetationArea = createProducerDto.vegetationArea;
    producer.cropsPlanted = cropsPlanted;

    return this.producersRepository.save(producer);
  }

  findAll() {
    return this.producersRepository.find({ relations: ['cropsPlanted'] });
  }

  findByName(name: string) {
    return this.producersRepository
      .createQueryBuilder('producer')
      .where('producer.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  findOne(id: number) {
    return this.producersRepository.findOne(id, {
      relations: ['cropsPlanted'],
    });
  }

  async update(id: number, updateProducerDto: UpdateProducerDto) {
    const currentProducer = await this.producersRepository.findOne(id, {
      relations: ['cropsPlanted'],
    });

    if (!currentProducer)
      throw new BusinessError('The passed id must be a valid one');

    const currentTotalArea =
      updateProducerDto.totalArea || currentProducer.totalArea;
    const currentArableArea =
      updateProducerDto.arableArea || currentProducer.arableArea;
    const currentVegetationArea =
      updateProducerDto.vegetationArea || currentProducer.vegetationArea;

    if (currentArableArea + currentVegetationArea > currentTotalArea)
      throw new BusinessError(
        'the sum of arable and vegetation areas should not be greater than total area',
      );

    currentProducer.name = updateProducerDto.name || currentProducer.name;

    currentProducer.documentType =
      updateProducerDto.document.type || currentProducer.documentType;

    currentProducer.documentValue =
      updateProducerDto.document[updateProducerDto.document.type] ||
      currentProducer.documentValue;

    currentProducer.farmName =
      updateProducerDto.farmName || currentProducer.farmName;

    currentProducer.city = updateProducerDto.city || currentProducer.city;

    currentProducer.stateInitials =
      updateProducerDto.stateInitials || currentProducer.stateInitials;

    currentProducer.totalArea = currentTotalArea;
    currentProducer.arableArea = currentArableArea;
    currentProducer.arableArea = currentVegetationArea;

    if (updateProducerDto.cropsPlanted) {
      const newCropsPlanted: Array<ProducerCropPlanted> = [];

      for (const crop of updateProducerDto.cropsPlanted) {
        const cropPlanted = new ProducerCropPlanted();

        cropPlanted.cropPlanted = crop;
        newCropsPlanted.push(cropPlanted);
      }

      currentProducer.cropsPlanted = newCropsPlanted;
    }

    return this.producersRepository.save(currentProducer);
  }

  async remove(id: number) {
    await this.producersCropPlantedRepository.delete({ producer: { id } });
    return this.producersRepository.delete(id);
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
