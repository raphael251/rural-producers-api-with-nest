import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  Length,
  Validate,
  IsIn,
  IsOptional,
} from 'class-validator';
import { CropType } from '../entities/producer-crop-planted.entity';
import { ProducerStateInitialsValidation } from '../validation/producer-state-initials.validation';
import { ProducerDocumentDto } from './producer-document.dto';

export class UpdateProducerDto {
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(60)
  @ApiProperty()
  name?: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ProducerDocumentDto)
  @ApiProperty()
  document?: ProducerDocumentDto;

  @IsNotEmpty()
  @IsOptional()
  @MaxLength(60)
  @ApiProperty()
  farmName?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  city?: string;

  @Length(2, 2)
  @IsNotEmpty()
  @IsOptional()
  @Validate(ProducerStateInitialsValidation)
  @ApiProperty()
  stateInitials?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  totalArea?: number;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  arableArea?: number;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  vegetationArea?: number;

  @IsNotEmpty()
  @IsOptional()
  @IsIn(Object.values(CropType), { each: true })
  @ApiProperty({
    enum: CropType,
    isArray: true,
  })
  cropsPlanted?: Array<CropType>;
}
