import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pawsPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  return new Pool({ connectionString });
}

export const db = global.__pawsPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  global.__pawsPool = db;
}
