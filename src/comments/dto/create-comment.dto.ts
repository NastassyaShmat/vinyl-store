import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  readonly text: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsDefined()
  readonly recordId: number;
}
