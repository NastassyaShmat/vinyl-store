import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { Record } from 'src/records/entities/record.entity';

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

  @OneToMany((type) => Record, (record) => record.id)
  records: Record[];

  @ManyToOne((type) => Order, (order) => order.id)
  order: Order;
}
