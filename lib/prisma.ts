import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    // M7 FIX: log query errors always; log queries and warnings in development.
    // Never log query parameters — they may contain user data.
    log:
      process.env.NODE_ENV === 'production'
        ? ['error']
        : ['query', 'warn', 'error'],
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
