import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { IsValidateCnpj } from 'src/utils/is-validade-cnpj.validator';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './create-product.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name required' })
  name: string;

  @IsEmail({ message: 'Valid email required' })
  email: string;

  @IsValidateCnpj({ message: 'Valid cpf required' })
  cnpj: string;

  @Type(() => CreateProductDto)
  @ValidateNested({ each: true })
  products: Product[];
}
