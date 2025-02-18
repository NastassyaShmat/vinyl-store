import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator';

export class orderItemToCreateOrderDto {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsPositive()
  readonly orderItemId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly recordId: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsDefined()
  @IsPositive()
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsPositive()
  readonly totalPrice: number;
}
export class CreateOrderDto {
  @ApiProperty({ type: [orderItemToCreateOrderDto] })
  @Type(() => orderItemToCreateOrderDto)
  @ValidateNested({ each: true })
  readonly orderItems: orderItemToCreateOrderDto[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly comments: string;
}
