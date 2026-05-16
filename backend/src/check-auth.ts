import prisma from './lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const loginId = 'admin'
  const password = 'admin123'
  
  const user = await prisma.user.findUnique({ where: { loginId } })
  if (!user) {
    console.log('User not found')
    return
  }
  
  const match = await bcrypt.compare(password, user.password)
  console.log(`User: ${user.loginId}`)
  console.log(`Role: ${user.role}`)
  console.log(`Password match: ${match}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
