import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  id!: number; // Utilisation de ! pour indiquer que TypeORM initialise cette propriété

  @Column()
  name!: string; // ! indique que la valeur sera fournie par TypeORM ou l'utilisateur

  @Column()
  ingredients!: string;

  @Column("float")
  price!: number;

  @Column({
    type: "enum",
    enum: ["TOMATO", "CREAM", "NATURE"],
  })
  base!: "TOMATO" | "CREAM" | "NATURE"; // Type aligné avec l'énumération de la colonne
}