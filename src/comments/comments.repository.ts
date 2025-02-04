import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class RatingRepository {
  constructor(@InjectRepository(Comment) private commentsRepository: Repository<Comment>) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentsRepository.save(createCommentDto);
  }

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  findOne(id: number): Promise<Comment | null> {
    return this.commentsRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateCommentDto: UpdateCommentDto): Promise<void> {
    await this.commentsRepository.update(id, updateCommentDto);
  }

  async remove(id: number): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
