import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "secret",
  database: process.env.DB_NAME || "pizzas_napoli",
  synchronize: false, // Désactivé pour éviter les conflits
  entities: ["src/entity/*.ts"],
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => console.error("Error during Data Source initialization:", err));