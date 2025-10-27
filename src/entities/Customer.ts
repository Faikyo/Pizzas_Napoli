import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // Relations à ajouter selon notre modèle
}
