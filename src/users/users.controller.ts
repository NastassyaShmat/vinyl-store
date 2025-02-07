import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from './entities/user.entity';

import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ status: string }> {
    await this.usersService.update(id, updateUserDto);
    return { status: 'Success' };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ status: string }> {
    await this.usersService.remove(id);
    return { status: 'Success' };
  }
}
