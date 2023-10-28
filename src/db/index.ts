import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';

const dbUrl = process.env.DATABASE_URL as string;

export const migrationClient = postgres(dbUrl, { max: 1 });
export const db = drizzle(postgres(dbUrl));
