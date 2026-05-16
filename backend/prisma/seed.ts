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

  // Clear existing classes
  await prisma.class.deleteMany({})
  console.log("Existing classes cleared")

  // Seed classes
  const classes = [
    { level: 'Transition', name: 'Buttercups', orderIndex: 1 },
    { level: 'Pre-Nursery', name: 'Hawthorn', orderIndex: 2 },
    { level: 'Nursery 1', name: 'Bluebell', orderIndex: 3 },
    { level: 'Grade 1', name: 'Aster', orderIndex: 4 },
    { level: 'Grade 2', name: 'Dahlia', orderIndex: 5 },
    { level: 'Grade 3', name: 'Saffron', orderIndex: 6 },
    { level: 'Grade 4', name: 'Ivory', orderIndex: 7 },
    { level: 'Grade 5', name: 'Hawthorn', orderIndex: 8 },
  ]

  for (const c of classes) {
    await prisma.class.upsert({
      where: { level_name: { level: c.level, name: c.name } },
      update: { orderIndex: c.orderIndex },
      create: c,
    })
  }
  console.log("Classes seeded")

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
