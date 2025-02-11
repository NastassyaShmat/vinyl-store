import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { RecordsService } from 'src/records/records.service';
import { User } from 'src/users/entities/user.entity';
import { Record } from 'src/records/entities/record.entity';

import { Rating } from './entities/rating.entity';
import { RatingsRepository } from './ratings.repository';

import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    private readonly recordService: RecordsService,
    private readonly usersService: UsersService,
    private readonly ratingsRepository: RatingsRepository,
  ) {}

  async create(userId: number, createRatingDto: CreateRatingDto): Promise<Rating> {
    const record: Record = await this.recordService.findOne(createRatingDto.recordId);
    const user: User = await this.usersService.findOne(userId);

    if (!record) {
      throw new BadRequestException(`Record should be defined.`);
    }
    if (!user) {
      throw new BadRequestException(`User should be defined.`);
    }

    const createRatingContent: CreateRatingDto & { user: User; record: Record; datePosted: Date } = {
      ...createRatingDto,
      datePosted: new Date(),
      user,
      record,
    };

    return this.ratingsRepository.create(createRatingContent);
  }

  findAll(userId: number): Promise<Rating[]> {
    return this.ratingsRepository.findAll(userId);
  }
}
