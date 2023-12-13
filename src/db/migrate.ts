// script to migrate database

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL;

if (typeof dbUrl !== "string") throw new Error("Invalid DATABASE_URL variable");

const migrationClient = postgres(dbUrl, { max: 1 });

async function main() {
  console.log("Beginning drizzle migration...");
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "src/db/migrations/",
  });
  console.log("Migration complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(0);
});
