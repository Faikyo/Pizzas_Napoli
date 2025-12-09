import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'pizzas_napoli',
  synchronize: true, // Génère le schéma automatiquement
  entities: ['src/entity/*.ts'],
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) =>
    console.error('Error during Data Source initialization:', err),
  );
