import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';

import { CreateRatingDto } from './dto/create-rating.dto';

@ApiTags('ratings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Req() req: Request, @Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    const userId: number = req.user['id'];
    return this.ratingsService.create(userId, createRatingDto);
  }

  @Get()
  findAll(@Req() req: Request): Promise<Rating[]> {
    const userId: number = req.user['id'];
    return this.ratingsService.findAll(userId);
  }
}
