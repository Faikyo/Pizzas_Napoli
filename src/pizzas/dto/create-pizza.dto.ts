import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, Min } from 'class-validator';

export class CreatePizzaDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prix: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredients?: string[];
}