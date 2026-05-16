import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("🚀 Setting up default terms...")

  const terms = ["First Term", "Second Term", "Third Term"]

  for (const name of terms) {
    await prisma.term.upsert({
      where: { name },
      update: {},
      create: { name }
    })
    console.log(`✅ Term ensured: ${name}`)
  }

  // Set First Term as current if no term is current
  const currentTerm = await prisma.term.findFirst({ where: { isCurrent: true } })
  if (!currentTerm) {
    await prisma.term.update({
      where: { name: "First Term" },
      data: { isCurrent: true }
    })
    console.log("🎯 'First Term' set as the default active term.")
  }

  console.log("✨ Term setup complete.")
}

main().catch(console.error).finally(() => prisma.$disconnect())
