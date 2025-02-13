import { BadRequestException, Injectable } from '@nestjs/common';

import { DeleteResult } from 'typeorm';

import { UsersService } from 'src/users/users.service';
import { RecordsService } from 'src/records/records.service';
import { Record } from 'src/records/entities/record.entity';
import { User } from 'src/users/entities/user.entity';

import { OrderItemsRepository } from './order-items.repository';
import { OrderItem } from './entities/order-item.entity';

import { DeleteOrderItemsDto } from './dto/delete-order-item.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly recordsService: RecordsService,
    private readonly orderItemsRepository: OrderItemsRepository,
  ) {}

  async create(userId: number, createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const record: Record = await this.recordsService.findOne(createOrderItemDto.recordId);
    const user: User = await this.usersService.findOne(userId);

    if (!record) {
      throw new BadRequestException('Record should be defined.');
    }
    if (!user) {
      throw new BadRequestException('User should be defined.');
    }

    const createOrderItemContent: CreateOrderItemDto & { user: User; record: Record; totalPrice: number; date: Date } =
      {
        ...createOrderItemDto,
        user,
        record,
        totalPrice: record.price * createOrderItemDto.quantity,
        date: new Date(),
      };

    return this.orderItemsRepository.create(createOrderItemContent);
  }

  findAll(userId: number): Promise<OrderItem[]> {
    return this.orderItemsRepository.findAll(userId);
  }

  findOne(id: number): Promise<OrderItem> {
    return this.orderItemsRepository.findOne(id);
  }

  async updateMany(updateOrderItemDto: UpdateOrderItemDto[]): Promise<void> {
    const recordIds: number[] = updateOrderItemDto.map((orderItem) => orderItem.recordId);
    const recordsToUpdate: Record[] = await this.recordsService.find(recordIds);
    const recordIdQuantityMap: Map<number, number> = new Map<number, number>();

    recordsToUpdate.forEach((record) => {
      recordIdQuantityMap.set(record.id, record.quantity);
    });

    const updateOrderItemContent: Array<{
      orderItemId: number;
      recordId: number;
      orderItemQuantity: number;
      recordQuantity: number;
    }> = updateOrderItemDto.map((orderItem) => ({
      ...orderItem,
      recordQuantity: recordIdQuantityMap.get(orderItem.recordId),
    }));

    return this.orderItemsRepository.update(updateOrderItemContent);
  }

  remove(userId: number, deleteOrderItemsDto: DeleteOrderItemsDto): Promise<DeleteResult> {
    if (!deleteOrderItemsDto.ids.length) {
      throw new BadRequestException(`Bad request`);
    }
    return this.orderItemsRepository.remove(userId, deleteOrderItemsDto.ids);
  }
}
