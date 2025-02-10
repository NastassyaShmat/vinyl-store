import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';

import { Record } from './entities/record.entity';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { RecordsRepository } from './records.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Record, User])],
  controllers: [RecordsController],
  providers: [RecordsService, RecordsRepository, UsersRepository],
})
export class RecordsModule {}
