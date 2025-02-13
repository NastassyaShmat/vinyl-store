import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';
export class UpdateOrderItemDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly orderItemQuantity: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly orderItemId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly recordId: number;
}
