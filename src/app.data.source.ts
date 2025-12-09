import { DataSource } from 'typeorm';
import { Pizza } from './entities/Pizza';
import { Customer } from './entities/Customer';
import { Order } from './entities/Order';
import { OrderItem } from './entities/OrderItem';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'pizzas_napoli',
  synchronize: true,
  entities: [Pizza, Customer, Order, OrderItem],
  logging: true,
});
