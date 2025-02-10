import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
      order: {
        firstName: 'ASC',
      },
      skip: 0,
      take: 10,
    });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  // should return relations too
  async findOne(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with identifier ${id} does not exist.`);
    }

    return user;
  }

  updateOne(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }
}
