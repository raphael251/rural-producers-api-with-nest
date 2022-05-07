import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  Length,
  MaxLength,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ProducerCnpjValidation } from '../producer-cnpj.validation';
import { ProducerCpfValidation } from '../producer-cpf.validation';
import { ProducerStateInitialsValidation } from '../producer-state-initials.validation';

export class ProducerDocumentDto {
  @IsNotEmpty()
  @IsIn(['cpf', 'cnpj'])
  type: 'cpf' | 'cnpj';

  @ValidateIf((doc: ProducerDocumentDto) => doc.type === 'cpf')
  @IsNotEmpty()
  @Length(11, 11)
  @Validate(ProducerCpfValidation)
  cpf?: string;

  @ValidateIf((o: ProducerDocumentDto) => o.type === 'cnpj')
  @IsNotEmpty()
  @Length(14, 14)
  @Validate(ProducerCnpjValidation)
  cnpj?: string;
}

export class CreateProducerDto {
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @ValidateNested({ each: true })
  @Type(() => ProducerDocumentDto)
  document: ProducerDocumentDto;

  @IsNotEmpty()
  @MaxLength(60)
  farmName: string;

  @IsNotEmpty()
  city: string;

  @Length(2, 2)
  @IsNotEmpty()
  @Validate(ProducerStateInitialsValidation)
  stateInitials: string;

  @IsNotEmpty()
  totalArea: number;

  @IsNotEmpty()
  arableArea: number;

  @IsNotEmpty()
  vegetationArea: number;

  @IsNotEmpty()
  @IsIn(['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açúcar'], { each: true })
  cropsPlanted: Array<string>;
}
