import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';
import { RecordsModule } from 'src/records/records.module';

import { OrderItem } from './entities/order-item.entity';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsRepository } from './order-items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), UsersModule, RecordsModule],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepository],
})
export class OrderItemsModule {}
