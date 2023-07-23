import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsNumber()
  id: number;
  @IsString()
  sku: string;
  @IsString()
  product_name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsString()
  category: string;
  @IsNumber()
  width: number;
  @IsNumber()
  height: number;
  @IsNumber()
  weight: number;
  @IsNumber()
  length: number;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date;
  @IsString()
  created_by: string;
}
