import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { Order } from './entities/order.entity';

import { User } from 'src/users/entities/user.entity';
import { Record } from 'src/records/entities/record.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createOrderContent: { user: User; orderItems: OrderItem[]; totalPrice: number; orderDate: Date; comments?: string },
    orderItemIdQuantityMap: Map<number, number>,
    recordIdQuantityMap: Map<number, number>,
  ): Promise<Order> {
    const order: Order = this.ordersRepository.create(createOrderContent);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(order);

      for (const [orderItemId, orderItemQuantity] of orderItemIdQuantityMap) {
        await queryRunner.manager
          .createQueryBuilder()
          .update(OrderItem)
          .set({
            quantity: orderItemQuantity,
            order,
          })
          .where('id = :id', { id: orderItemId })
          .execute();
      }
      for (const [recordId, recordQuantity] of recordIdQuantityMap) {
        await queryRunner.manager
          .createQueryBuilder()
          .update(Record)
          .set({
            quantity: recordQuantity,
          })
          .where('id = :id', { id: recordId })
          .execute();
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return order;
  }

  findAll(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: {
        user: { id: userId },
      },
      select: {
        id: true,
        totalPrice: true,
        orderDate: true,
        status: true,
      },
      order: {
        orderDate: 'ASC',
      },
      skip: 0,
      take: 20,
    });
  }

  async findOne(userId: number, id: number): Promise<Order> {
    const order: Order = await this.ordersRepository.findOne({
      where: {
        user: { id: userId },
        id: id,
      },
      relations: {
        orderItems: true,
      },
      select: {
        id: true,
        totalPrice: true,
        orderDate: true,
        status: true,
        comments: true,
        orderItems: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with identifier ${id} does not exist.`);
    }

    return order;
  }

  async updateOne(id: number, updateOrderDto: UpdateOrderDto): Promise<void> {
    await this.ordersRepository.update(id, updateOrderDto);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
