import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, Min, ValidateNested } from 'class-validator';
export class UpdateOrderItemDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly totalPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly id: number;
}

export class BulkUpdateOrderItemsDto {
  @ApiProperty({ type: [UpdateOrderItemDto] })
  @Type(() => UpdateOrderItemDto)
  @ValidateNested({ each: true })
  orderItems: UpdateOrderItemDto[];
}
