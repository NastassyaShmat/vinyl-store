import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Comment } from 'src/comments/entities/comment.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Entity({ name: 'records' })
export class Record {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer', name: 'price', nullable: false })
  price: number;

  @Column({ type: 'integer', name: 'quantity', nullable: false })
  quantity: number;

  @Column({ type: 'varchar', name: 'title', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', name: 'artist', length: 255, nullable: false })
  artist: string;

  @Column({ type: 'varchar', name: 'genre', length: 255, nullable: false })
  genre: string;

  @Column({ type: 'integer', name: 'released_year', nullable: false })
  releasedYear: number;

  @Column({ type: 'varchar', name: 'image', nullable: true })
  image: string;

  @Column({ type: 'varchar', name: 'description', length: 500, nullable: true })
  description: string;

  @OneToMany((type) => Comment, (comment) => comment.id, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany((type) => Rating, (rating) => rating.id, { onDelete: 'CASCADE' })
  ratings: Rating[];

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToMany((type) => OrderItem, (orderItem) => orderItem.id)
  orderItems: OrderItem[];
}
