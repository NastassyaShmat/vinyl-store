import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsPositive, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(10)
  @IsDefined()
  readonly rating: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsDefined()
  readonly recordId: number;
}
