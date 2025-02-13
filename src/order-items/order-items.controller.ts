import { Controller, Get, Post, Body, Patch, Param, Req, ParseIntPipe } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { DeleteOrderItemsDto } from './dto/delete-order-item.dto';

@ApiTags('order-items')
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
  async update(@Body() updateOrderItemDto: UpdateOrderItemDto[]): Promise<{ status: string }> {
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
