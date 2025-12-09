import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsBoolean()
  statut?: boolean;
}