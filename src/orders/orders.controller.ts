import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //  Créer une commande pour le client connecté
  @Post('orders')
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const customerId = req.user.sub;
    return this.ordersService.create(createOrderDto, customerId);
  }

  //  Liste toutes les commandes du client connecté
  @Get('my/orders')
  findMyOrders(@Request() req) {
    const customerId = req.user.sub;
    return this.ordersService.findByCustomer(customerId);
  }

  // Consulte une commande du client
  @Get('my/orders/:id')
  async findMyOrder(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const customerId = req.user.sub;
    const order = await this.ordersService.findOne(id);

    // Vérifier que la commande appartient au client connecté
    if (order.customer.idCustomer !== customerId) {
      throw new ForbiddenException('This order does not belong to you');
    }

    return order;
  }

  // P Met à jour le statut d'une commande du client
  @Put('my/orders/:id')
  async updateMyOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req,
  ) {
    const customerId = req.user.sub;
    const order = await this.ordersService.findOne(id);

    // Vérifier que la commande appartient au client connecté
    if (order.customer.idCustomer !== customerId) {
      throw new ForbiddenException('This order does not belong to you');
    }

    return this.ordersService.update(id, updateOrderDto);
  }
}