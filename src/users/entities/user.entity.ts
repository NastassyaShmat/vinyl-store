import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

import { UserRole } from 'src/enums';
import { Crypto } from 'src/utils/crypto.service';
import { Comment } from 'src/comments/entities/comment.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Record } from 'src/records/entities/record.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 50,
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name', length: 50, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', name: 'phone_number', length: 10 })
  phoneNumber: string;

  @Column({ type: 'varchar', name: 'birth_date', length: 10 })
  birthDate: string;

  @Column({ type: 'varchar', name: 'password', length: 255 })
  @Exclude()
  password: string;

  @Column({ type: 'boolean', name: 'is_verified', default: false, nullable: false })
  isVerified: boolean;

  @Column({
    type: 'enum',
    name: 'role',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Comment, (comment) => comment.id)
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.id)
  ratings: Rating[];

  @OneToMany(() => Record, (record) => record.id, { onDelete: 'CASCADE' })
  records: Record[];

  @OneToMany(() => Order, (order) => order.id, { onDelete: 'CASCADE' })
  orders: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password.length) {
      this.password = await Crypto.getEncryptedString(this.password);
    }
  }
}
