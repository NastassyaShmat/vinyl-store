import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly recordId: number;
}
