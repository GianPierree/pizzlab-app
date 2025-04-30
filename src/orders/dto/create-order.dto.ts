import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  product_code: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
