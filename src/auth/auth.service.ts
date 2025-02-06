import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { SignUpDto } from './dto/sign-up.dto';
import { Crypto } from 'src/utils/crypto.service';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(signUpDto: SignUpDto): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(signUpDto.email);

    if (user) {
      throw new BadRequestException(`User with such email ${signUpDto.email} already exists.`);
    }
    return this.usersService.create(signUpDto);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findOneByEmail(username);

    if (!user) {
      throw new UnauthorizedException(`User with email ${username} does not exist.`);
    }

    if (!(await Crypto.verifyEncryptedWithOriginal(user.password, pass))) {
      throw new UnauthorizedException('Password is not valid');
    }
    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
