import { Controller, Get, Post, Body, Patch, Param, Req, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { BulkUpdateOrderItemsDto } from './dto/update-order-item.dto';
import { DeleteOrderItemsDto } from './dto/delete-order-item.dto';

@ApiTags('order-items')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Req() req: Request, @Body() createOrderItemDto: CreateOrderItemDto) {
    const userId: number = req.user['id'];
    return this.orderItemsService.create(userId, createOrderItemDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId: number = req.user['id'];
    return this.orderItemsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.findOne(id);
  }

  @Patch()
  async update(@Body() updateOrderItemDto: BulkUpdateOrderItemsDto): Promise<{ status: string }> {
    await this.orderItemsService.updateMany(updateOrderItemDto);
    return { status: 'Success' };
  }

  @Post('delete')
  async remove(@Req() req: Request, @Body() deleteOrderItemsDto: DeleteOrderItemsDto): Promise<{ status: string }> {
    const userId: number = req.user['id'];
    await this.orderItemsService.remove(userId, deleteOrderItemsDto);
    return { status: 'Success' };
  }
}
