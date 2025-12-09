import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedDatabase } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Seed automatique (ne s'exécute que si DB vide)
  if (process.env.NODE_ENV === 'development') {
    await seedDatabase();
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
