import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from '../entities/Pizza';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>,
  ) {}

  create(createPizzaDto: CreatePizzaDto) {
    const pizza = this.pizzaRepository.create(createPizzaDto);
    return this.pizzaRepository.save(pizza);
  }

  findAll() {
    return this.pizzaRepository.find();
  }

  async findOne(id: number) {
    const pizza = await this.pizzaRepository.findOne({
      where: { idPizza: id },
    });
    if (!pizza) {
      throw new NotFoundException(`Pizza with not found`);
    }
    return pizza;
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto) {
    const pizza = await this.findOne(id);
    Object.assign(pizza, updatePizzaDto);
    return this.pizzaRepository.save(pizza);
  }

  async remove(id: number) {
    const pizza = await this.findOne(id);
    await this.pizzaRepository.remove(pizza);
    return { message: `Pizza deleted successfully` };
  }
}
