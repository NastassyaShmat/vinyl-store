import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { OrderItem } from './entities/order-item.entity';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class RatingRepository {
  constructor(@InjectRepository(OrderItem) private orderItemsRepository: Repository<OrderItem>) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsRepository.save(createOrderItemDto);
  }

  findAll(): Promise<OrderItem[]> {
    return this.orderItemsRepository.find();
  }

  findOne(id: number): Promise<OrderItem | null> {
    return this.orderItemsRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<void> {
    await this.orderItemsRepository.update(id, updateOrderItemDto);
  }

  async remove(id: number): Promise<void> {
    await this.orderItemsRepository.delete(id);
  }
}
