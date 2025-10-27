import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { AppDataSource } from "./data-source";

const app = new Hono();

app.get("/health", async (c) => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.destroy(); // Optionnel, juste pour tester la connexion
    return c.text("OK");
  } catch (err) {
    // Vérification de type pour err
    if (err instanceof Error) {
      return c.text("Error: " + err.message, 500);
    }
    return c.text("Unknown error occurred", 500);
  }
});

console.log("Server starting on port 3000...");
serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Server running on http://localhost:3000");
});