import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateRecordDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly artist: string;

  @ApiProperty()
  @IsString()
  readonly genre: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly quantity: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly image: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly releasedYear: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly description: string;
}
