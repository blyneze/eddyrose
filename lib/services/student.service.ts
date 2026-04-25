import prisma from "@/lib/prisma"

/**
 * Fetch all enrolled students with their current class and linked parents.
 * Ordered alphabetically by name.
 *
 * Security H7 FIX: parent users are fetched with explicit select — password hash
 * is never included in the response tree.
 */
export async function getStudents() {
  return prisma.student.findMany({
    orderBy: { name: "asc" },
    take: 500, // prevent unbounded response
    include: {
      parents: {
        include: {
          parentProfile: {
            include: {
              user: {
                // H7 FIX: select only safe user fields — never include password
                select: { id: true, name: true, loginId: true, role: true },
              },
            },
          },
        },
      },
      enrollments: {
        include: { class: true },
      },
    },
  })
}

/**
 * Enroll a new student in the system.
 * Throws a typed error if the registration number already exists (Prisma P2002).
 */
export async function createStudent(data: { name: string; registrationNumber: string }) {
  try {
    return await prisma.student.create({
      data: {
        name: data.name,
        registrationNumber: data.registrationNumber,
      },
    })
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("A student with this Registration Number already exists.")
    }
    throw new Error("Failed to create student.")
  }
}
