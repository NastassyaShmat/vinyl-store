import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(@InjectRepository(Comment) private commentsRepository: Repository<Comment>) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentsRepository.save(createCommentDto);
  }

  findAll(userId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: {
        user: { id: userId },
      },
      relations: { user: true, record: true },
      select: { id: true, datePosted: true, text: true },
      order: {
        datePosted: 'ASC',
      },
      skip: 0,
      take: 10,
    });
  }

  findOne(id: number): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: { id },
      relations: { user: true, record: true },
      select: { id: true, datePosted: true, text: true },
    });
  }

  getUsersComment(userId: number, id: number): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: { id, user: { id: userId } },
      select: { id: true, text: true },
    });
  }

  updateOne(id: number, updateCommentDto: UpdateCommentDto): Promise<UpdateResult> {
    return this.commentsRepository.update(id, updateCommentDto);
  }

  remove(userId: number, id: number): Promise<DeleteResult> {
    return this.commentsRepository.delete({ id, user: { id: userId } });
  }
}
