import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { DeleteResult, In, UpdateResult } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { Record } from './entities/record.entity';
import { RecordsRepository } from './records.repository';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Injectable()
export class RecordsService {
  constructor(
    private readonly recordsRepository: RecordsRepository,
    private readonly usersService: UsersService,
  ) {}

  //if createRecordDto contain an image have to implement upload image logic.
  async create(userId: number, createRecordDto: CreateRecordDto): Promise<Record> {
    const user: User = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException(`Can not create a record without user`);
    }

    const createRecordContent: CreateRecordDto & { user: User } = {
      ...createRecordDto,
      user,
    };
    return this.recordsRepository.create(createRecordContent);
  }

  // should implement download image logic
  findAll(): Promise<Record[]> {
    return this.recordsRepository.findAll();
  }

  // to get records with orderItems id
  find(recordIds: number[]): Promise<Record[]> {
    return this.recordsRepository.find(recordIds);
  }

  // should implement download image logic
  findOne(id: number): Promise<Record> {
    return this.recordsRepository.findOne(id);
  }

  // should implement download image logic
  async update(id: number, updateRecordDto: UpdateRecordDto): Promise<UpdateResult> {
    const record = await this.recordsRepository.findOne(id);

    if (!record) {
      throw new NotFoundException(`Record with identifier ${id} does not exist.`);
    }
    return this.recordsRepository.updateOne(id, updateRecordDto);
  }

  // before deleting should to delete file from cloud store.
  remove(id: number): Promise<DeleteResult> {
    return this.recordsRepository.remove(id);
  }
}
