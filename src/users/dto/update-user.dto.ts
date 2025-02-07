import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNumber: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly birthDate: string;
}
