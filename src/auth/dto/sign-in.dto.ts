import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
