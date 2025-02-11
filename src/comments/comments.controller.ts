import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    const userId: number = req.user['id'];
    return this.commentsService.create(userId, createCommentDto);
  }

  @Get()
  findAll(@Req() req: Request): Promise<Comment[]> {
    const userId: number = req.user['id'];
    return this.commentsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<{ status: string }> {
    const userId: number = req.user['id'];
    await this.commentsService.update(userId, id, updateCommentDto);
    return { status: 'Success' };
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number): Promise<{ status: string }> {
    const userId: number = req.user['id'];
    await this.commentsService.remove(userId, id);
    return { status: 'Success' };
  }
}
