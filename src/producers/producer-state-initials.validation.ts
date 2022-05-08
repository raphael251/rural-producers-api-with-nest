import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
export class ProducerStateInitialsValidation
  implements ValidatorConstraintInterface
{
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const statesInitials = [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ];
    return statesInitials.includes(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `stateInitials must be a valid brazilian UF`;
  }
}
