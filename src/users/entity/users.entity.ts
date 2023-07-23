import { Products } from 'src/products/entity/products.entity';
import { Notifications } from 'src/notifications/entity/notifications.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ default: false })
  is_admin: boolean;

  // create json object based on this class
  // {
  //   "username": "edric",
  //   "password": "12345678",
  //   "is_admin": true
  // }

  // relations
  @OneToMany(() => Products, (products: Products) => products.created_by)
  products: Products[];

  @OneToMany(
    () => Notifications,
    (notifications: Notifications) => notifications.created_by,
  )
  notifications: Notifications[];
}
