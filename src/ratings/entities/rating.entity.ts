import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Record } from 'src/records/entities/record.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'ratings' })
export class Rating {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer', name: 'rating', nullable: false })
  rating: number;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToOne((type) => Record, (record) => record.id, { onDelete: 'CASCADE' })
  record: Record;
}
