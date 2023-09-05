import { ProducerDto } from '../dto/producer.dto';
import { Producer } from '../entities/producer.entity';

export function producerDtoMapper(producer: Producer): ProducerDto {
  return {
    id: producer.id,
    name: producer.name,
    document: {
      type: producer.documentType,
      [producer.documentType]: producer.documentValue,
    },
    farmName: producer.farmName,
    city: producer.city,
    stateInitials: producer.stateInitials,
    totalArea: producer.totalArea,
    arableArea: producer.arableArea,
    vegetationArea: producer.vegetationArea,
    cropsPlanted: producer.cropsPlanted.reduce(
      (prev, curr) => [...prev, curr.cropPlanted],
      [],
    ),
  };
}
