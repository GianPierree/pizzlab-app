import { 
  IsDecimal, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  MaxLength, 
  MinLength 
} from 'class-validator';

export class CreateProductDto {
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(150)
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,2' })
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  code: string;

  @IsString()
  @IsOptional()
  created_user: string;
}
