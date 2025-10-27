import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  idOrder: number;

  @Column()
  nom: string;

  @Column('decimal', { precision: 5, scale: 2 })
  total: number;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  statut : boolean


  // Relations à ajouter selon notre modèle
}