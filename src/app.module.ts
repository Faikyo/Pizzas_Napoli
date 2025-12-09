import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzasModule } from './pizzas/pizzas.module';
import { Customer } from './entities/Customer';
import { Pizza } from './entities/Pizza';
import { Order } from './entities/Order';
import { OrderItem } from './entities/OrderItem';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Pizza, Customer, Order, OrderItem],
      synchronize: true, // à désactiver en production
    }),
    PizzasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
