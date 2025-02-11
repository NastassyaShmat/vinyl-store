import { Module } from '@nestjs/common';

import { RecordsModule } from 'src/records/records.module';
import { RecordsService } from 'src/records/records.service';
import { UsersModule } from 'src/users/users.module';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [RecordsModule, UsersModule],
  controllers: [FilesController],
  providers: [FilesService, RecordsService],
  exports: [FilesService],
})
export class FilesModule {}
