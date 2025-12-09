import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './Order';
import { Pizza } from './Pizza';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  idOrderItem: number;

  @Column()
  quantite: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Pizza, (pizza) => pizza.orderItems)
  pizza: Pizza;
}
