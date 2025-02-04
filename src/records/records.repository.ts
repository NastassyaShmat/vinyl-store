import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Record } from './entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Injectable()
export class RecordRepository {
  constructor(@InjectRepository(Record) private recordsRepository: Repository<Record>) {}

  create(createRecordDto: CreateRecordDto) {
    return this.recordsRepository.save(createRecordDto);
  }

  findAll(): Promise<Record[]> {
    return this.recordsRepository.find();
  }

  findOne(id: number): Promise<Record | null> {
    return this.recordsRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateRecordDto: UpdateRecordDto): Promise<void> {
    await this.recordsRepository.update(id, updateRecordDto);
  }

  async remove(id: number): Promise<void> {
    await this.recordsRepository.delete(id);
  }
}
