import { BaseDto } from "./base-dto";
import { ApiProperty } from "@nestjs/swagger";

export class ServiceDto extends BaseDto {

  @ApiProperty({ description: 'Название' })
  name: string;

  @ApiProperty({ description: 'Описание' })
  description: string;

  @ApiProperty({ description: 'Стоимость' })
  price: number;

  @ApiProperty({ description: 'Фотография услуги' })
  photo: string;

  @ApiProperty({ description: 'Услуга является популярной' })
  isPopular: boolean;

} 

export class CreateServiceDto extends BaseDto {

  @ApiProperty({ description: 'Название' })
  name: string;

  @ApiProperty({ description: 'Описание' })
  description: string;

  @ApiProperty({ description: 'Id категории услуг' })
  categoryId: number;

  @ApiProperty({ description: 'Стоимость' })
  price: number;

} 