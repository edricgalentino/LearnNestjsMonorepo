import { Users } from 'src/users/entity/users.entity';
import { Notifications } from 'src/notifications/entity/notifications.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
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

  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  category: string;

  // dimensions
  @Column({ type: 'varchar', length: 255, nullable: true })
  width: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  height: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
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
  @ManyToOne(() => Users, (users: Users) => users.created_by)
  users: Users[];

  @ManyToMany(
    () => Notifications,
    (notifications: Notifications) => notifications.created_by,
  )
  notifications: Notifications[];
}
