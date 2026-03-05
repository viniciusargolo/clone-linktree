import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// 1. Instancie a Pool do driver 'pg' nativo
const connectionString = `${process.env.DATABASE_URL}`;

// 2. Crie o adapter (o "braço" de comunicação)
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ 
  adapter,
  log: ["query", "info", "warn", "error"] 
});

export { prisma };