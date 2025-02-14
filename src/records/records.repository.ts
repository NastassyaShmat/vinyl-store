import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';

import { Record } from './entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Injectable()
export class RecordsRepository {
  constructor(@InjectRepository(Record) private recordsRepository: Repository<Record>) {}

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordsRepository.save(createRecordDto);
  }

  // should to add to relations Comments and Rating
  findAll(): Promise<Record[]> {
    return this.recordsRepository.find({
      select: {
        title: true,
        artist: true,
        genre: true,
        releasedYear: true,
        price: true,
        quantity: true,
        image: true,
      },
      skip: 0,
      take: 15,
    });
  }

  // to get records with orderItems id
  find(recordIds: number[]): Promise<Record[]> {
    return this.recordsRepository.find({
      where: { id: In(recordIds) },
      select: {
        id: true,
        price: true,
        quantity: true,
      },
    });
  }

  // should to add to relations Comments and Rating
  async findOne(id: number): Promise<Record> {
    const record = await this.recordsRepository.findOne({
      where: { id },
      select: {
        id: true,
        title: true,
        artist: true,
        genre: true,
        releasedYear: true,
        price: true,
        quantity: true,
        image: true,
        description: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Record with identifier ${id} does not exist.`);
    }

    return record;
  }

  async updateOne(id: number, updateRecordDto: UpdateRecordDto): Promise<UpdateResult> {
    return this.recordsRepository.update(id, updateRecordDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.recordsRepository.delete(id);
  }
}
