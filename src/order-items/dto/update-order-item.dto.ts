import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, Min, ValidateNested } from 'class-validator';
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

export class BulkUpdateOrderItemsDto {
  @ApiProperty({ type: [UpdateOrderItemDto] })
  @Type(() => UpdateOrderItemDto)
  @ValidateNested({ each: true })
  orderItems: UpdateOrderItemDto[];
}
