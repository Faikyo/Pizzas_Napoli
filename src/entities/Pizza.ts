import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  idPizza: number;

  @Column()
  nom: string;

  @Column('decimal', { precision: 5, scale: 2 })
  prix: number;

  @Column({ nullable: true })
  ingredients: string[];

  // Relations à ajouter selon notre modèle
}