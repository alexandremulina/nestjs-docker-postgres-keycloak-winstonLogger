import { ProductCode } from 'src/utils/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  product: string;

  @Column({ nullable: true })
  value: number;

  @Column({ nullable: false, type: 'enum', enum: ProductCode })
  code: ProductCode;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
