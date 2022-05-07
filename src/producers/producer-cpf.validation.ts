import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
export class ProducerCpfValidation implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return cpf.isValid(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `document.cpf must be a valid CPF number`;
  }
}
