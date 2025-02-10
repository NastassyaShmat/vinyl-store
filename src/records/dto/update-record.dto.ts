import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRecordDto } from './create-record.dto';
import { IsBase64, IsOptional, IsString } from 'class-validator';

export class UpdateRecordDto extends PartialType(CreateRecordDto) {
  @ApiPropertyOptional()
  @IsString()
  @IsBase64()
  @IsOptional()
  image: string;
}
