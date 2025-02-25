import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsRepository {
  constructor(@InjectRepository(Rating) private ratingsRepository: Repository<Rating>) {}

  create(createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingsRepository.save(createRatingDto);
  }

  findAll(userId: number): Promise<Rating[]> {
    return this.ratingsRepository.find({
      where: {
        user: { id: userId },
      },
      relations: { user: true, record: true },
      select: { id: true, rating: true },
      skip: 0,
      take: 10,
    });
  }
}
