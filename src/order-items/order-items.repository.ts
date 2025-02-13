import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { DataSource, DeleteResult, In, Repository } from 'typeorm';

import { Record } from 'src/records/entities/record.entity';
import { User } from 'src/users/entities/user.entity';

import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

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
      await queryRunner.manager.save(createOrderItemContent);

      await queryRunner.manager
        .createQueryBuilder()
        .update(Record)
        .set({ quantity: createOrderItemContent.record.quantity - createOrderItemContent.quantity })
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

  async findOne(id: number): Promise<OrderItem> {
    const orderItem: OrderItem = await this.orderItemsRepository.findOneBy({ id });

    if (!orderItem) {
      throw new NotFoundException(`OrderItem with identifier ${id} does not exist.`);
    }

    return orderItem;
  }

  async update(
    updateOrderItemContent: Array<{
      orderItemId: number;
      recordId: number;
      orderItemQuantity: number;
      recordQuantity: number;
    }>,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const orderItem of updateOrderItemContent) {
        await queryRunner.manager
          .createQueryBuilder()
          .update(OrderItem)
          .set({ quantity: orderItem.orderItemQuantity })
          .where('id = :id', { id: orderItem.orderItemId })
          .execute();

        await queryRunner.manager
          .createQueryBuilder()
          .update(Record)
          .set({ quantity: orderItem.recordQuantity - orderItem.orderItemQuantity })
          .where('id = :id', { id: orderItem.recordId })
          .execute();
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  remove(userId: number, ids: number[]): Promise<DeleteResult> {
    return this.orderItemsRepository.delete({ id: In(ids), user: { id: userId } });
  }
}
