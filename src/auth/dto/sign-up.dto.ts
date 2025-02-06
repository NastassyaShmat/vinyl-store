import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class SignUpDto extends CreateUserDto {
  @ApiProperty()
  @IsDate()
  readonly birthDate: string;
}
