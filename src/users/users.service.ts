import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new record';
  }

  findAll() {
    return `This action returns all records`;
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  findOne(id: number) {
    return `This action returns a #${id} record`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} record`;
  }

  remove(id: number) {
    return `This action removes a #${id} record`;
  }
}
