import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class SignUpDto extends CreateUserDto {
  @ApiProperty()
  @IsDateString()
  readonly birthDate: string;
}
