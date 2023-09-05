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
  @ApiProperty({ required: false })
  name?: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ProducerDocumentDto)
  @ApiProperty({ required: false })
  document?: ProducerDocumentDto;

  @IsNotEmpty()
  @IsOptional()
  @MaxLength(60)
  @ApiProperty({ required: false })
  farmName?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ required: false })
  city?: string;

  @Length(2, 2)
  @IsNotEmpty()
  @IsOptional()
  @Validate(ProducerStateInitialsValidation)
  @ApiProperty({ required: false })
  stateInitials?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ required: false })
  totalArea?: number;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ required: false })
  arableArea?: number;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ required: false })
  vegetationArea?: number;

  @IsNotEmpty()
  @IsOptional()
  @IsIn(Object.values(CropType), { each: true })
  @ApiProperty({
    enum: CropType,
    isArray: true,
    required: false,
  })
  cropsPlanted?: Array<CropType>;
}
