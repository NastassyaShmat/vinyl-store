import { BadRequestException, Injectable } from '@nestjs/common';

import { UpdateResult } from 'typeorm';

import { OrdersRepository } from './orders.repository';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { OrderItemsService } from 'src/order-items/order-items.service';
import { RecordsService } from 'src/records/records.service';
import { Record } from 'src/records/entities/record.entity';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersService: UsersService,
    private readonly recordsService: RecordsService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user: User = await this.usersService.findOne(userId);

    const orderItemIds: number[] = createOrderDto.orderItems.map((orderItem) => orderItem.orderItemId);
    const orderItems: OrderItem[] = await this.orderItemsService.getOrderItemsById(orderItemIds);
    const orderItemIdQuantityMap: Map<number, number> = new Map<number, number>();

    const recordIds: number[] = createOrderDto.orderItems.map((orderItem) => orderItem.recordId);
    const recordsToUpdate: Record[] = await this.recordsService.find(recordIds);
    const recordIdQuantityMap: Map<number, number> = new Map<number, number>();

    const totalPrice: number = createOrderDto.orderItems.reduce((acc, currentItem) => {
      acc = acc + currentItem.totalPrice;
      return acc;
    }, 0);

    createOrderDto.orderItems.forEach((orderItem) => {
      orderItemIdQuantityMap.set(orderItem.recordId, orderItem.quantity);
    });

    recordsToUpdate.forEach((record) => {
      recordIdQuantityMap.set(record.id, record.quantity - orderItemIdQuantityMap.get(record.id));
    });

    Object.entries(recordIdQuantityMap).forEach(([recordId, recordQuantity]) => {
      if (recordQuantity < 0) {
        throw new BadRequestException(
          `Record quantity for record with identifier ${recordId}is not enough for purchase.`,
        );
      }
    });

    const createOrderContent: {
      user: User;
      orderItems: OrderItem[];
      totalPrice: number;
      orderDate: Date;
      comments?: string;
    } = {
      user,
      totalPrice,
      orderDate: new Date(),
      orderItems,
      comments: createOrderDto.comments,
    };

    return this.ordersRepository.create(createOrderContent, orderItemIdQuantityMap, recordIdQuantityMap);
  }

  findAll(userId: number): Promise<Order[]> {
    return this.ordersRepository.findAll(userId);
  }

  findOne(userId: number, id: number): Promise<Order> {
    return this.ordersRepository.findOne(userId, id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
    return this.ordersRepository.updateOne(id, updateOrderDto);
  }
}
