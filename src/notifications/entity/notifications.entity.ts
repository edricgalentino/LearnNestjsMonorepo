import { Users } from 'src/users/entity/users.entity';
import { Products } from 'src/products/entity/products.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'notifications' })
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  message: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  type: string;

  @Column({ default: false, nullable: false })
  is_read: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  created_by: string;

  // relations
  @ManyToOne(() => Users, (users: Users) => users.created_by)
  users: Users[];

  @ManyToMany(() => Products, (products: Products) => products.created_by)
  products: Products[];
}
