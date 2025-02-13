import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderStatus } from 'src/enums';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer', name: 'total_price', nullable: false })
  totalPrice: number;

  @Column({ type: 'date', name: 'order_date', nullable: false })
  orderDate: Date;

  @Column({ type: 'enum', name: 'status', enum: OrderStatus, default: OrderStatus.OPEN, nullable: false })
  status: OrderStatus;

  @Column({ type: 'varchar', name: 'comments', length: 500 })
  comments: string;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.id, { onDelete: 'CASCADE' })
  orderItems: OrderItem[];
}
