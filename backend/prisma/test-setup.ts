import { PrismaClient, Role, ResultStatus } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🚀 Starting Eddyrose Academy Test Flow Setup...")

  // 1. Session & Term
  const session = await prisma.session.upsert({
    where: { name: "2025/2026" },
    update: { isCurrent: true },
    create: { name: "2025/2026", isCurrent: true },
  })

  const term = await prisma.term.upsert({
    where: { name: "Second Term" },
    update: { isCurrent: true },
    create: { name: "Second Term", isCurrent: true },
  })

  console.log("✅ Session and Term created.")

  // 2. Class
  const nurseryClass = await prisma.class.upsert({
    where: { level_name: { level: "Nursery", name: "Nursery One" } },
    update: {},
    create: { level: "Nursery", name: "Nursery One", orderIndex: 1 },
  })

  console.log("✅ Class 'Nursery One' created.")

  // 3. Teacher
  const hashedPassword = await bcrypt.hash("password123", 10)
  
  const teacherUser = await prisma.user.upsert({
    where: { loginId: "teacher@test.com" },
    update: { password: hashedPassword },
    create: {
      loginId: "teacher@test.com",
      password: hashedPassword,
      name: "Test Teacher",
      role: Role.TEACHER,
    },
  })

  const teacherProfile = await prisma.teacherProfile.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: { userId: teacherUser.id },
  })

  await prisma.teacherClassAssignment.upsert({
    where: {
      teacherProfileId_classId: {
        teacherProfileId: teacherProfile.id,
        classId: nurseryClass.id,
      },
    },
    update: {},
    create: {
      teacherProfileId: teacherProfile.id,
      classId: nurseryClass.id,
    },
  })

  console.log("✅ Teacher created and assigned to Nursery One.")

  // 4. Subjects
  const subjectNames = [
    "Literacy", "Nursery Science", "Quantitative Reasoning", "Social Norms", 
    "Spelling", "Verbal Reasoning", "Health Habits", "Phonics", 
    "Shapes/Colours", "Rhymes", "Bible Knowledge", "Handwriting", 
    "Coloring", "Numeracy"
  ]

  const subjects = []
  for (const name of subjectNames) {
    const sub = await prisma.subject.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    
    // Link to Class
    await prisma.classSubject.upsert({
      where: {
        classId_subjectId: {
          classId: nurseryClass.id,
          subjectId: sub.id,
        }
      },
      update: {},
      create: {
        classId: nurseryClass.id,
        subjectId: sub.id,
      }
    })
    subjects.push(sub)
  }

  const classSubjects = await prisma.classSubject.findMany({
    where: { classId: nurseryClass.id },
    include: { subject: true }
  })

  console.log(`✅ ${subjectNames.length} Subjects created and linked to class.`)

  // 5. Student
  const student = await prisma.student.upsert({
    where: { registrationNumber: "EDDY/2026/001" },
    update: { sex: "Female" },
    create: {
      name: "Glory Olumachi Kelechi",
      registrationNumber: "EDDY/2026/001",
      sex: "Female",
    },
  })

  // Enrollment
  await prisma.studentEnrollment.upsert({
    where: {
      studentId_sessionId_termId: {
        studentId: student.id,
        sessionId: session.id,
        termId: term.id,
      }
    },
    update: { classId: nurseryClass.id },
    create: {
      studentId: student.id,
      sessionId: session.id,
      termId: term.id,
      classId: nurseryClass.id,
    }
  })

  console.log("✅ Student created and enrolled.")

  // 6. Parent User
  const parentUser = await prisma.user.upsert({
    where: { loginId: "parent@test.com" },
    update: { password: hashedPassword },
    create: {
      loginId: "parent@test.com",
      password: hashedPassword,
      name: "Mr./Mrs. Kelechi",
      role: Role.PARENT,
    },
  })

  const parentProfile = await prisma.parentProfile.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: { userId: parentUser.id },
  })

  await prisma.parentStudentLink.upsert({
    where: {
      parentProfileId_studentId: {
        parentProfileId: parentProfile.id,
        studentId: student.id,
      }
    },
    update: {},
    create: {
      parentProfileId: parentProfile.id,
      studentId: student.id,
    }
  })

  console.log("✅ Parent created and linked to student.")

  // 7. Result Sheet (Simulate Teacher Upload)
  const resultSheet = await prisma.resultSheet.upsert({
    where: {
      studentId_sessionId_termId: {
        studentId: student.id,
        sessionId: session.id,
        termId: term.id,
      }
    },
    update: {
      status: ResultStatus.SUBMITTED, // "PENDING" in user request
      classId: nurseryClass.id,
      teacherComment: "Glory is a very brilliant and attentive student. She shows great interest in literacy.",
      principalComment: "An excellent performance. Keep up the good work.",
      closingDate: new Date("2026-04-10"),
      resumptionDate: new Date("2026-05-04"),
      affectiveDomain: {
        "Punctuality": 5,
        "Neatness": 5,
        "Politeness": 4,
        "Honesty": 5,
        "Relationship with others": 4,
      }
    },
    create: {
      studentId: student.id,
      sessionId: session.id,
      termId: term.id,
      classId: nurseryClass.id,
      status: ResultStatus.SUBMITTED,
      teacherComment: "Glory is a very brilliant and attentive student. She shows great interest in literacy.",
      principalComment: "An excellent performance. Keep up the good work.",
      closingDate: new Date("2026-04-10"),
      resumptionDate: new Date("2026-05-04"),
      affectiveDomain: {
        "Punctuality": 5,
        "Neatness": 5,
        "Politeness": 4,
        "Honesty": 5,
        "Relationship with others": 4,
      }
    }
  })

  // Create entries for each subject
  for (const cs of classSubjects) {
    // Random realistic scores
    const testScore = Math.floor(Math.random() * 5) + 25 // 25-30
    const examScore = Math.floor(Math.random() * 10) + 60 // 60-70

    await prisma.resultEntry.upsert({
      where: {
        resultSheetId_classSubjectId: {
          resultSheetId: resultSheet.id,
          classSubjectId: cs.id,
        }
      },
      update: {
        testScore,
        examScore,
      },
      create: {
        resultSheetId: resultSheet.id,
        classSubjectId: cs.id,
        testScore,
        examScore,
      }
    })
  }

  console.log("✅ Results uploaded (Status: SUBMITTED).")

  // Ensure an Admin exists
  await prisma.user.upsert({
    where: { loginId: "admin@eddyrose.com" },
    update: { password: hashedPassword },
    create: {
      loginId: "admin@eddyrose.com",
      password: hashedPassword,
      name: "System Admin",
      role: Role.SUPERADMIN,
    },
  })

  console.log("✅ Admin user ready.")

  console.log("\n------------------------------------------------")
  console.log("📊 TEST FLOW SETUP COMPLETE")
  console.log("------------------------------------------------")
  console.log("Teacher Login:   teacher@test.com / password123")
  console.log("Parent Login:    parent@test.com  / password123")
  console.log("Admin Login:     admin@eddyrose.com / password123")
  console.log("Student:         Glory Olumachi Kelechi (EDDY/2026/001)")
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
