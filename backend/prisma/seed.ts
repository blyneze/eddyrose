import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  // Seed default superadmin
  const superadmin = await prisma.user.upsert({
    where: { loginId: 'admin' },
    update: {},
    create: {
      loginId: 'admin',
      password: hashedPassword,
      role: 'SUPERADMIN',
      name: 'System Administrator',
    },
  })
  console.log("Superadmin seeded:", superadmin.loginId)

  // Seed basic session
  const session = await prisma.session.upsert({
    where: { name: '2023/2024' },
    update: {},
    create: { name: '2023/2024', isCurrent: true }
  })
  console.log("Session seeded:", session.name)

  // Seed basic term
  const term = await prisma.term.upsert({
    where: { name: 'First Term' },
    update: {},
    create: { name: 'First Term', isCurrent: true }
  })
  console.log("Term seeded:", term.name)

  // Seed basic class
  const cls = await prisma.class.upsert({
    where: { name: 'Grade 1' },
    update: {},
    create: { name: 'Grade 1', orderIndex: 1 }
  })
  console.log("Class seeded:", cls.name)

  // Seed basic subjects
  const math = await prisma.subject.upsert({
    where: { name: 'Mathematics' },
    update: {},
    create: { name: 'Mathematics' }
  })
  const english = await prisma.subject.upsert({
    where: { name: 'English Language' },
    update: {},
    create: { name: 'English Language' }
  })
  console.log("Subjects seeded")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
