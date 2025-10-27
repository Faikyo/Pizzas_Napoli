import { AppDataSource } from "./app.data.source";
import { Pizza } from './entities/Pizza';

async function seed() {
  await AppDataSource.initialize();
  
  const pizzaRepo = AppDataSource.getRepository(Pizza);
  
  const pizzas = [
    { nom: 'Margherita', prix: 8.50, description: 'Tomate, mozzarella, basilic' },
    { nom: 'Regina', prix: 10.00, description: 'Tomate, mozzarella, jambon, champignons' },
    { nom: 'Napolitaine', prix: 11.50, description: 'Tomate, mozzarella, anchois, câpres' }
  ];
  
  await pizzaRepo.save(pizzas);
  console.log('✅ Données de test insérées');
  
  await AppDataSource.destroy();
}

seed().catch(console.error);