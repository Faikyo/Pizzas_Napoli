import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  pizzaId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantite: number;
}