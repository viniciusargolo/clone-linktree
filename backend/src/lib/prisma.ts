import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ 
  adapter,
  log: ["query", "info", "warn", "error"] 
});

export { prisma };

// 3303587d-aa35-43a5-8df1-95b34b0ec911 lula