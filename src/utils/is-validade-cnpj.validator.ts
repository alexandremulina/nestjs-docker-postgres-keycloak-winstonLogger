import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validateCNPJ } from './validateCnpj';

@ValidatorConstraint({ async: true })
class IsValidateCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return validateCNPJ(value);
  }
}

export function IsValidateCnpj(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidateCnpjConstraint,
    });
  };
}
