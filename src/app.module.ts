import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerMiddleware } from './middlewares/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { RecordsModule } from './records/records.module';
import { Record } from './records/entities/record.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderItem } from './order-items/entities/order-item.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { RatingsModule } from './ratings/ratings.module';
import { Rating } from './ratings/entities/rating.entity';
import { DataSource } from 'typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'vinyl-store',
      entities: [User, Record, Order, OrderItem, Comment, Rating],
      synchronize: true,
    }),
    RecordsModule,
    OrdersModule,
    OrderItemsModule,
    CommentsModule,
    RatingsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
