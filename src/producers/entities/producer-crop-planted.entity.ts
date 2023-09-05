import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producer } from './producer.entity';

export enum CropType {
  SOJA = 'Soja',
  MILHO = 'Milho',
  ALGODAO = 'Algodão',
  CAFE = 'Café',
  CANA_DE_ACUCAR = 'Cana de Açúcar',
}

@Entity()
export class ProducerCropPlanted {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CropType })
  cropPlanted: CropType;

  @ManyToOne(() => Producer, (producer) => producer.cropsPlanted)
  producer: Producer;
}
