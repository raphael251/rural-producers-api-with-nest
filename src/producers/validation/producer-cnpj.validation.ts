import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
export class ProducerCnpjValidation implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    return cnpj.isValid(value);
  }
  defaultMessage?(): string {
    return `document.cnpj must be a valid CNPJ number`;
  }
}
