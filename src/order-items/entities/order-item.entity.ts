import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { Record } from 'src/records/entities/record.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer', name: 'quantity', nullable: false })
  quantity: number;

  @Column({ type: 'integer', name: 'total_price', nullable: false })
  totalPrice: number;

  @Column({ type: 'date', name: 'order_date', nullable: false })
  date: Date;

  @ManyToOne((type) => Record, (record) => record.id)
  record: Record;

  @ManyToOne((type) => Order, (order) => order.id)
  order: Order;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;
}
