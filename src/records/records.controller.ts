import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Record } from './entities/record.entity';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@ApiTags('Records')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: Request, @Body() createRecordDto: CreateRecordDto): Promise<Record> {
    const userId: number = req['user'];
    return this.recordsService.create(userId, createRecordDto);
  }

  @Get()
  findAll(): Promise<Record[]> {
    return this.recordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Record> {
    return this.recordsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecordDto: UpdateRecordDto,
  ): Promise<{ status: string }> {
    await this.recordsService.update(id, updateRecordDto);
    return { status: 'Success' };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ status: string }> {
    await this.recordsService.remove(id);
    return { status: 'Success' };
  }
}
