import { AppDataSource } from "./data-source";
import { Pizza } from "./entity/Pizza";

async function seed() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations(); // Optionnel, si tu utilises des migrations

  const pizza = new Pizza();
  pizza.name = "Margherita";
  pizza.ingredients = "Tomato, Mozzarella, Basil";
  pizza.price = 10.99;
  pizza.base = "TOMATO";
  await AppDataSource.manager.save(pizza);

  console.log("Database seeded!");
  await AppDataSource.destroy();
}

seed().catch((err) => console.error(err));