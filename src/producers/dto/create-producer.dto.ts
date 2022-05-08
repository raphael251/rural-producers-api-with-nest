import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  isArray,
  IsIn,
  IsNotEmpty,
  Length,
  MaxLength,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CropType } from '../entities/producer-crop-planted.entity';
import { ProducerCnpjValidation } from '../producer-cnpj.validation';
import { ProducerCpfValidation } from '../producer-cpf.validation';
import { ProducerStateInitialsValidation } from '../producer-state-initials.validation';

export class ProducerDocumentDto {
  @IsNotEmpty()
  @IsIn(['cpf', 'cnpj'])
  @ApiProperty({ enum: ['cpf', 'cnpj'] })
  type: 'cpf' | 'cnpj';

  @ValidateIf((doc: ProducerDocumentDto) => doc.type === 'cpf')
  @IsNotEmpty()
  @Length(11, 11)
  @Validate(ProducerCpfValidation)
  @ApiPropertyOptional()
  cpf?: string;

  @ValidateIf((o: ProducerDocumentDto) => o.type === 'cnpj')
  @IsNotEmpty()
  @Length(14, 14)
  @Validate(ProducerCnpjValidation)
  @ApiPropertyOptional()
  cnpj?: string;
}

export class CreateProducerDto {
  @IsNotEmpty()
  @MaxLength(60)
  @ApiProperty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => ProducerDocumentDto)
  @ApiProperty()
  document: ProducerDocumentDto;

  @IsNotEmpty()
  @MaxLength(60)
  @ApiProperty()
  farmName: string;

  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @Length(2, 2)
  @IsNotEmpty()
  @Validate(ProducerStateInitialsValidation)
  @ApiProperty()
  stateInitials: string;

  @IsNotEmpty()
  @ApiProperty()
  totalArea: number;

  @IsNotEmpty()
  @ApiProperty()
  arableArea: number;

  @IsNotEmpty()
  @ApiProperty()
  vegetationArea: number;

  @IsNotEmpty()
  @IsIn(['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açúcar'], { each: true })
  @ApiProperty({
    enum: CropType,
    isArray: true,
  })
  cropsPlanted: Array<CropType>;
}
