import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import {
  CropType,
  ProducerCropPlanted,
} from './entities/producer-crop-planted.entity';
import { Producer } from './entities/producer.entity';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private producersRepository: Repository<Producer>,
    @InjectRepository(ProducerCropPlanted)
    private producersCropPlantedRepository: Repository<ProducerCropPlanted>,
  ) {}

  async create(createProducerDto: CreateProducerDto) {
    if (
      createProducerDto.arableArea + createProducerDto.vegetationArea >
      createProducerDto.totalArea
    )
      return new BadRequestException(
        'the sum of arable and vegetation areas should not be greater than total area',
      );

    const producer = new Producer();
    const cropsPlanted = createProducerDto.cropsPlanted.map(
      (crop: CropType) => {
        const cropPlanted = new ProducerCropPlanted();
        cropPlanted.cropPlanted = crop;
        return cropPlanted;
      },
    );

    for (const cropPlanted of cropsPlanted) {
      await this.producersCropPlantedRepository.save(cropPlanted);
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

    if (!currentProducer) return new NotFoundException('Producer not found');

    const currentTotalArea =
      updateProducerDto.totalArea || currentProducer.totalArea;
    const currentArableArea =
      updateProducerDto.arableArea || currentProducer.arableArea;
    const currentVegetationArea =
      updateProducerDto.vegetationArea || currentProducer.vegetationArea;

    if (currentArableArea + currentVegetationArea > currentTotalArea)
      return new BadRequestException(
        'the sum of arable and vegetation areas should not be greater than total area',
      );

    // this.producersRepository.update(id, {
    //   ...updateProducerDto,
    //   totalArea: currentTotalArea,
    //   arableArea: currentArableArea,
    //   vegetationArea: currentVegetationArea,
    // });

    return `this service should update producer, ${updateProducerDto}`;
  }

  async remove(id: number) {
    await this.producersCropPlantedRepository.delete({ producer: { id } });
    return this.producersRepository.delete(id);
  }
}
