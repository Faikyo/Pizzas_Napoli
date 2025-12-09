import { AppDataSource } from './app.data.source';
import { Pizza } from './entities/Pizza';
import { Customer } from './entities/Customer';
import { Order } from './entities/Order';
import { OrderItem } from './entities/OrderItem';

export async function seedDatabase() {
  try {
    await AppDataSource.initialize();

    const pizzaRepo = AppDataSource.getRepository(Pizza);
    const customerRepo = AppDataSource.getRepository(Customer);
    const orderRepo = AppDataSource.getRepository(Order);
    const orderItemRepo = AppDataSource.getRepository(OrderItem);

    // Vérifier si des données existent déjà (vérifier TOUTES les tables)
    const pizzaCount = await pizzaRepo.count();
    const customerCount = await customerRepo.count();
    const orderCount = await orderRepo.count();
    const orderItemCount = await orderItemRepo.count();

    if (
      pizzaCount > 0 ||
      customerCount > 0 ||
      orderCount > 0 ||
      orderItemCount > 0
    ) {
      console.log('✅ Database already seeded, skipping...');
      console.log(
        `   Pizzas: ${pizzaCount}, Customers: ${customerCount}, Orders: ${orderCount}, OrderItems: ${orderItemCount}`,
      );
      return;
    }

    console.log('🌱 Seeding database...');

    // 1. Créer les pizzas
    const pizzas = await pizzaRepo.save([
      {
        nom: 'Margherita',
        prix: 8.5,
        ingredients: ['Tomate', 'Mozzarella', 'Basilic'],
      },
      {
        nom: 'Regina',
        prix: 10.0,
        ingredients: ['Tomate', 'Mozzarella', 'Jambon', 'Champignons'],
      },
      {
        nom: 'Quatre Fromages',
        prix: 11.5,
        ingredients: ['Mozzarella', 'Gorgonzola', 'Parmesan', 'Chèvre'],
      },
      {
        nom: 'Napolitaine',
        prix: 10.5,
        ingredients: ['Tomate', 'Mozzarella', 'Anchois', 'Câpres', 'Olives'],
      },
      {
        nom: 'Calzone',
        prix: 12.0,
        ingredients: ['Tomate', 'Mozzarella', 'Jambon', 'Champignons', 'Œuf'],
      },
      {
        nom: 'Végétarienne',
        prix: 11.0,
        ingredients: [
          'Tomate',
          'Mozzarella',
          'Poivrons',
          'Aubergines',
          'Courgettes',
        ],
      },
      {
        nom: 'Barbecue',
        prix: 12.5,
        ingredients: [
          'Sauce BBQ',
          'Mozzarella',
          'Poulet',
          'Oignons',
          'Poivrons',
        ],
      },
    ]);
    console.log(`✅ ${pizzas.length} pizzas créées`);

    // 2. Créer les clients
    const customers = await customerRepo.save([
      {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        mdp: 'password123',
      },
      {
        nom: 'Martin',
        prenom: 'Marie',
        email: 'marie.martin@example.com',
        mdp: 'password123',
      },
      {
        nom: 'Dubois',
        prenom: 'Pierre',
        email: 'pierre.dubois@example.com',
        mdp: 'password123',
      },
    ]);
    console.log(`✅ ${customers.length} clients créés`);

    // 3. Créer des commandes
    const orders = await orderRepo.save([
      {
        customer: customers[0],
        total: 21.0,
        date: new Date(),
        statut: false, // false = pending, true = completed
      },
      {
        customer: customers[1],
        total: 22.5,
        date: new Date(),
        statut: true, // completed
      },
    ]);
    console.log(`✅ ${orders.length} commandes créées`);

    // 4. Créer les items de commande
    const orderItems = await orderItemRepo.save([
      // Commande 1 de Jean : 2 Margherita + 1 Quatre Fromages
      { order: orders[0], pizza: pizzas[0], quantite: 2 }, // 2x Margherita
      { order: orders[0], pizza: pizzas[2], quantite: 1 }, // 1x Quatre Fromages

      // Commande 2 de Marie : 1 Regina + 1 Napolitaine
      { order: orders[1], pizza: pizzas[1], quantite: 1 }, // 1x Regina
      { order: orders[1], pizza: pizzas[3], quantite: 1 }, // 1x Napolitaine
    ]);
    console.log(`✅ ${orderItems.length} items de commande créés`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    throw error;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

// Si exécuté directement
if (require.main === module) {
  seedDatabase().catch(console.error);
}