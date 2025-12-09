import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from './Customer';
import { OrderItem } from './OrderItem';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  idOrder: number;

  @Column('decimal', { precision: 5, scale: 2 })
  total: number;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  statut: boolean;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
