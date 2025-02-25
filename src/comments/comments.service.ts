import { BadRequestException, Injectable } from '@nestjs/common';

import { DeleteResult, UpdateResult } from 'typeorm';

import { Record } from 'src/records/entities/record.entity';
import { RecordsService } from 'src/records/records.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { Comment } from './entities/comment.entity';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly recordService: RecordsService,
    private readonly usersService: UsersService,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async create(userId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const record: Record = await this.recordService.findOne(createCommentDto.recordId);
    const user: User = await this.usersService.findOne(userId);

    if (!record) {
      throw new BadRequestException(`Record should be defined.`);
    }
    if (!user) {
      throw new BadRequestException(`User should be defined.`);
    }

    const createCommentContent: CreateCommentDto & { user: User; record: Record; datePosted: Date } = {
      ...createCommentDto,
      datePosted: new Date(),
      user,
      record,
    };

    return this.commentsRepository.create(createCommentContent);
  }

  findAll(userId: number): Promise<Comment[]> {
    return this.commentsRepository.findAll(userId);
  }

  findOne(id: number): Promise<Comment> {
    return this.commentsRepository.findOne(id);
  }

  private getUsersComment(userId: number, id: number): Promise<Comment> {
    return this.commentsRepository.getUsersComment(userId, id);
  }

  async update(userId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<UpdateResult> {
    const commentToUpdate: Comment = await this.getUsersComment(userId, id);

    if (!commentToUpdate) {
      throw new BadRequestException(`User with id ${userId} can not update comment with id ${id}`);
    }

    return this.commentsRepository.updateOne(id, updateCommentDto);
  }

  async remove(userId: number, id: number): Promise<DeleteResult> {
    const commentToDelete: Comment = await this.getUsersComment(userId, id);

    if (!commentToDelete) {
      throw new BadRequestException(`User with id ${userId} can not update comment with id ${id}`);
    }

    return this.commentsRepository.remove(userId, id);
  }
}
