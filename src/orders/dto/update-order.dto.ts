import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { OrderStatus } from 'src/enums';

export class UpdateOrderDto {
  @ApiProperty()
  @IsString()
  @IsEnum(OrderStatus)
  readonly status: OrderStatus;
}
