import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  idCustomer: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  email: string;

  @Column()
  mdp: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
