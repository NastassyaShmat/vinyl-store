import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Record } from 'src/records/entities/record.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', name: 'text', nullable: false })
  text: string;

  @Column({ type: 'date', name: 'date_posted', nullable: false })
  datePosted: Date;

  @ManyToOne((type) => User, (user) => user.id, {})
  user: User;

  @ManyToOne((type) => Record, (record) => record.id, { onDelete: 'CASCADE' })
  record: Record;
}
