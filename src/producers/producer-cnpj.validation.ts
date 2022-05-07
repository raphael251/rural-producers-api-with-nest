import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
export class ProducerCnpjValidation implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return cnpj.isValid(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `document.cpf must be a valid CPF number`;
  }
}
