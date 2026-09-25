import  { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db,client } from "../db/client.js";

async function runMigrations() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations completed.');
  await client.end();
}

runMigrations().catch((error) => {
  console.error('Error running migrations:', error);
  process.exit(1);
});