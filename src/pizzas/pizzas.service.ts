import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pizza } from '../entities/Pizza';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza)
    private pizzasRepository: Repository<Pizza>,
  ) {}

  async create(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    const pizza = this.pizzasRepository.create(createPizzaDto);
    return this.pizzasRepository.save(pizza);
  }

  async findAll(): Promise<Pizza[]> {
    return this.pizzasRepository.find();
  }

  async findOne(id: number): Promise<Pizza> {
    const pizza = await this.pizzasRepository.findOne({
      where: { idPizza: id },
    });
    if (!pizza) {
      throw new NotFoundException(`Pizza #${id} not found`);
    }
    return pizza;
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto): Promise<Pizza> {
    const pizza = await this.findOne(id);
    Object.assign(pizza, updatePizzaDto);
    return this.pizzasRepository.save(pizza);
  }

  async remove(id: number): Promise<void> {
    const pizza = await this.findOne(id);
    await this.pizzasRepository.remove(pizza);
  }
}
