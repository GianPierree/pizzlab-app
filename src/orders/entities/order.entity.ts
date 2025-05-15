import { Product } from 'src/products/entities/product.entity';
import { 
  Column, 
  DeleteDateColumn, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  mount: number;

  @Column({ default: 'PENDING' })
  status: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ length: 50 })
  created_user: string;

  @Column({ length: 50, nullable: true })
  updated_user: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  created_date: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  @DeleteDateColumn()
  deleted_date: Date;

  @Column({ default: true })
  is_active: boolean;
}
