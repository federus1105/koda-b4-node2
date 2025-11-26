let prisma;

export async function getPrisma() {
  if (!prisma) {
    const { PrismaClient } = await import('../generated/prisma/index.js');
    prisma = new PrismaClient();
  }
  return prisma;
}
