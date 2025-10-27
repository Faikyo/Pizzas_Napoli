import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  idOrderItem: number;

  @Column()
  quantite: number;


  // Relations à ajouter selon notre modèle
}