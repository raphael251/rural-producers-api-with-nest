import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProducerCropPlanted } from './producer-crop-planted.entity';

export type DocumentType = 'cpf' | 'cnpj';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'enum', enum: ['cpf', 'cnpj'] })
  documentType: DocumentType;

  @Column({ type: 'varchar', length: 14 })
  documentValue: string;

  @Column({ type: 'varchar', length: 60 })
  farmName: string;

  @Column()
  city: string;

  @Column({ type: 'char', length: 2 })
  stateInitials: string;

  @Column('float')
  totalArea: number;

  @Column('float')
  arableArea: number;

  @Column('float')
  vegetationArea: number;

  @OneToMany(() => ProducerCropPlanted, (cropPlanted) => cropPlanted.producer)
  cropsPlanted: ProducerCropPlanted[];
}
