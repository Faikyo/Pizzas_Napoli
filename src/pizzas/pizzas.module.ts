import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzasService } from './pizzas.service';
import { PizzasController } from './pizzas.controller';
import { Pizza } from '../entities/Pizza';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza])],
  controllers: [PizzasController],
  providers: [PizzasService],
  exports: [PizzasService],
})
export class PizzasModule {}