import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("🧹 Starting Database Wipe (Maintaining Classes and SuperAdmin)...")

  // 1. Delete all results and entries
  await prisma.resultEntry.deleteMany({})
  await prisma.resultSheet.deleteMany({})
  console.log("✅ Results cleared.")

  // 2. Delete all student enrollments
  await prisma.studentEnrollment.deleteMany({})
  console.log("✅ Enrollments cleared.")

  // 3. Delete all teacher assignments
  await prisma.teacherClassAssignment.deleteMany({})
  console.log("✅ Teacher assignments cleared.")

  // 4. Delete all students and teachers
  // Note: deleting the User will cascade to Student/TeacherProfile because of onDelete: Cascade in schema
  await prisma.user.deleteMany({
    where: {
      role: {
        in: ['STUDENT', 'TEACHER']
      }
    }
  })
  console.log("✅ Student and Teacher accounts cleared.")

  // 5. Clear content
  await prisma.announcement.deleteMany({})
  await prisma.event.deleteMany({})
  console.log("✅ Announcements and Events cleared.")

  // 6. Ensure SuperAdmin exists (if not already there)
  // We keep existing SUPERADMINs, but let's make sure the primary one is there.
  const admin = await prisma.user.findFirst({
    where: { role: 'SUPERADMIN' }
  })

  if (!admin) {
    console.log("⚠️ No SuperAdmin found. Creating default admin@eddyrose.com...")
    const bcrypt = require('bcryptjs')
    const hashedPassword = await bcrypt.hash("password123", 10)
    await prisma.user.create({
      data: {
        loginId: "admin@eddyrose.com",
        password: hashedPassword,
        name: "System Admin",
        role: "SUPERADMIN",
      }
    })
    console.log("✅ Default Admin created.")
  } else {
    console.log(`✅ Maintained SuperAdmin: ${admin.loginId}`)
  }

  console.log("\n------------------------------------------------")
  console.log("✨ DATABASE CLEANUP COMPLETE")
  console.log("------------------------------------------------")
  console.log("Maintained: Classes, Subjects, Sessions, Terms")
  console.log("Cleared: Students, Teachers, Results, Enrollments")
  console.log("------------------------------------------------\n")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
