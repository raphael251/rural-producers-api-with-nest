import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsIn,
  ValidateIf,
  Length,
  Validate,
} from 'class-validator';
import { ProducerCnpjValidation } from '../validation/producer-cnpj.validation';
import { ProducerCpfValidation } from '../validation/producer-cpf.validation';

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
