import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecordsModule } from 'src/records/records.module';
import { UsersModule } from 'src/users/users.module';

import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { RatingsRepository } from './ratings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), RecordsModule, UsersModule],
  controllers: [RatingsController],
  providers: [RatingsService, RatingsRepository],
})
export class RatingsModule {}
