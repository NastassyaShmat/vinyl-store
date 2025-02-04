import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { SignUpDto } from './dto/sign-up.dto';

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

  // have to check pass and is valid email (skip it now) and return user or necessary users fields
  // but before this have to add before save hook into entity schema which will create a hash from password and several functions to check is password valid
  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findOneByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
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
