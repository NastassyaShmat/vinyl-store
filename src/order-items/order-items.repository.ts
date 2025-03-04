import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { DataSource, DeleteResult, In, Repository, UpdateResult } from 'typeorm';

import { Record } from 'src/records/entities/record.entity';
import { User } from 'src/users/entities/user.entity';

import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsRepository {
  constructor(
    @InjectRepository(OrderItem) private orderItemsRepository: Repository<OrderItem>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createOrderItemContent: CreateOrderItemDto & { user: User; record: Record; totalPrice: number; date: Date },
  ): Promise<OrderItem> {
    const orderItem: OrderItem = this.orderItemsRepository.create(createOrderItemContent);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (createOrderItemContent.record.quantity - createOrderItemContent.quantity < 0) {
        throw new BadRequestException(`Can not create Order Item with such quantity`);
      }

      await queryRunner.manager.save(orderItem);
      await queryRunner.manager
        .createQueryBuilder()
        .update(Record)
        .set({
          quantity: createOrderItemContent.record.quantity - createOrderItemContent.quantity,
        })
        .where('id = :id', { id: createOrderItemContent.recordId })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return orderItem;
  }

  findAll(userId: number): Promise<OrderItem[]> {
    return this.orderItemsRepository.find({
      where: {
        user: { id: userId },
      },
      relations: { record: true },
      select: { totalPrice: true, quantity: true },
      order: { date: 'ASC' },
      skip: 0,
      take: 10,
    });
  }

  find(orderItemIds: number[]): Promise<OrderItem[]> {
    return this.orderItemsRepository.find({
      where: {
        id: In(orderItemIds),
      },
      relations: { record: true },
      select: { quantity: true },
    });
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem: OrderItem = await this.orderItemsRepository.findOneBy({ id });

    if (!orderItem) {
      throw new NotFoundException(`OrderItem with identifier ${id} does not exist.`);
    }

    return orderItem;
  }

  async update(id: number, updateOrderItemContent: { quantity: number; totalPrice: number }): Promise<UpdateResult> {
    return this.orderItemsRepository.update(id, updateOrderItemContent);
  }

  remove(userId: number, ids: number[]): Promise<DeleteResult> {
    return this.orderItemsRepository.delete({ id: In(ids), user: { id: userId } });
  }
}
