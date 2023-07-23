import { Users } from 'src/users/entity/users.entity';
import { Notifications } from 'src/notifications/entity/notifications.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  sku: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  product_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  // @Column({ type: 'varchar', length: 255, nullable: false })
  // image: string[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  category: string;

  // dimensions
  @Column({ type: 'varchar', length: 255, nullable: true })
  width: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  height: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  weight: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  length: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  created_by: string;

  // relations
  @OneToMany(() => Users, (users: Users) => users.username)
  users: Users[];

  @OneToMany(
    () => Notifications,
    (notifications: Notifications) => notifications.created_by,
  )
  notifications: Notifications[];
}
