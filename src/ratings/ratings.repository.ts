import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingRepository {
  constructor(@InjectRepository(Rating) private ratingsRepository: Repository<Rating>) {}

  create(createRatingDto: CreateRatingDto) {
    return this.ratingsRepository.save(createRatingDto);
  }

  findAll(): Promise<Rating[]> {
    return this.ratingsRepository.find();
  }

  findOne(id: number): Promise<Rating | null> {
    return this.ratingsRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateRatingDto: UpdateRatingDto): Promise<void> {
    await this.ratingsRepository.update(id, updateRatingDto);
  }

  async remove(id: number): Promise<void> {
    await this.ratingsRepository.delete(id);
  }
}
