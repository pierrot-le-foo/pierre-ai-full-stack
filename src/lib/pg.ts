import Pool from "pg-pool";
import { config } from "dotenv";

config();

export const configPool = {
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  host: process.env.PSQL_HOST,
  port: Number(process.env.PSQL_PORT as string),
  database: process.env.PSQL_DATABASE,
  ssl: process.env.NODE_ENV === "production",
  max: 20,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
  maxUses: 7500,
}

export const pool = new Pool(configPool);