import { Controller, Get, Post, Body, Patch, Param, Req, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';

import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const userId: number = req.user['id'];
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<Order[]> {
    const userId: number = req.user['id'];
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number): Promise<Order> {
    const userId: number = await req.user['id'];
    return this.ordersService.findOne(userId, id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<{ status: string }> {
    await this.ordersService.update(id, updateOrderDto);
    return { status: 'Success' };
  }
}
