import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CustomersService } from '../customers/customers.service';
import { PizzasService } from '../pizzas/pizzas.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private customersService: CustomersService,
    private pizzasService: PizzasService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    customerId: number,
  ): Promise<Order> {
    // Vérifier que le client existe
    const customer = await this.customersService.findOne(customerId);

    // Créer la commande
    const order = this.ordersRepository.create({
      customer,
      date: new Date(),
      statut: false, // Toujours "pending" à la création
      total: 0,
    });

    const savedOrder = await this.ordersRepository.save(order);

    // Créer les items et calculer le total
    let total = 0;
    const orderItems: OrderItem[] = [];

    for (const itemDto of createOrderDto.items) {
      const pizza = await this.pizzasService.findOne(itemDto.pizzaId);

      const orderItem = this.orderItemsRepository.create({
        order: savedOrder,
        pizza,
        quantite: itemDto.quantite,
      });

      orderItems.push(orderItem);
      total += Number(pizza.prix) * itemDto.quantite;
    }

    await this.orderItemsRepository.save(orderItems);

    // Mettre à jour le total
    savedOrder.total = total;
    return this.ordersRepository.save(savedOrder);
  }
  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['customer', 'orderItems', 'orderItems.pizza'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { idOrder: id },
      relations: ['customer', 'orderItems', 'orderItems.pizza'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async findByCustomer(customerId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { customer: { idCustomer: customerId } },
      relations: ['orderItems', 'orderItems.pizza'],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
  }
}
