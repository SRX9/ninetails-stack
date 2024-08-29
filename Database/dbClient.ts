import { Pool } from "@neondatabase/serverless";

export const getDBPool = () => {
  return new Pool({ connectionString: process.env.DATABASE_POOL_URL });
};
