import { Injectable } from '@nestjs/common';

import { DeleteResult, UpdateResult } from 'typeorm';

import { Record } from './entities/record.entity';
import { RecordsRepository } from './records.repository';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Injectable()
export class RecordsService {
  constructor(private readonly recordsRepository: RecordsRepository) {}

  //if createRecordDto contain an image have to implement upload image logic.
  create(createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordsRepository.create(createRecordDto);
  }

  // should implement download image logic
  findAll(): Promise<Record[]> {
    return this.recordsRepository.findAll();
  }

  // should implement download image logic
  findOne(id: number): Promise<Record> {
    return this.recordsRepository.findOne(id);
  }

  // should implement download image logic
  update(id: number, updateRecordDto: UpdateRecordDto): Promise<UpdateResult> {
    return this.recordsRepository.updateOne(id, updateRecordDto);
  }

  // before deleting should to delete file from cloud store.
  remove(id: number): Promise<DeleteResult> {
    return this.recordsRepository.remove(id);
  }
}
