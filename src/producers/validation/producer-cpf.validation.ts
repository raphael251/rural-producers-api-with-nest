import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
export class ProducerCpfValidation implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    return cpf.isValid(value);
  }
  defaultMessage?(): string {
    return `document.cpf must be a valid CPF number`;
  }
}
