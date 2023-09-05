import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  Length,
  MaxLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CropType } from '../entities/producer-crop-planted.entity';
import { ProducerStateInitialsValidation } from '../validation/producer-state-initials.validation';
import { ProducerDocumentDto } from './producer-document.dto';

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
  @IsIn(Object.values(CropType), { each: true })
  @ApiProperty({
    enum: CropType,
    isArray: true,
  })
  cropsPlanted: Array<CropType>;
}
