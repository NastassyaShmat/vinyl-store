import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class RatingRepository {
  constructor(@InjectRepository(Order) private ordersRepository: Repository<Order>) {}

  create(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.save(createOrderDto);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findOne(id: number): Promise<Order | null> {
    return this.ordersRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateOrderDto: UpdateOrderDto): Promise<void> {
    await this.ordersRepository.update(id, updateOrderDto);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
