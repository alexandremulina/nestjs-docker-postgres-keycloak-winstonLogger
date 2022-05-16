import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductCode } from 'src/utils/enums';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name required' })
  @IsString()
  product: string;

  @IsNotEmpty({ message: 'Value required' })
  @IsNumber()
  value: number;

  @IsNotEmpty({ message: 'Product code required' })
  @IsEnum(ProductCode)
  code: ProductCode;
}
