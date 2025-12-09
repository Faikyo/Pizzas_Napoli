import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  idPizza: number;

  @Column()
  nom: string;

  @Column('decimal', { precision: 5, scale: 2 })
  prix: number;

  @Column('simple-array', { nullable: true })
  ingredients: string[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.pizza)
  orderItems: OrderItem[];
}
