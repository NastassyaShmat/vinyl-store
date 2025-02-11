import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

import { Record } from './entities/record.entity';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { RecordsRepository } from './records.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UsersModule],
  controllers: [RecordsController],
  providers: [RecordsService, RecordsRepository, UsersService],
  exports: [RecordsService, RecordsRepository],
})
export class RecordsModule {}
