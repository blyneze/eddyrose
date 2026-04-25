import prisma from "@/lib/prisma"

/**
 * Fetch all classes with enrollment and teacher assignment counts.
 * Ordered by the class orderIndex (admin-controlled sort order).
 */
export async function getClasses() {
  return prisma.class.findMany({
    orderBy: { orderIndex: "asc" },
    include: {
      _count: {
        select: {
          enrollments: true,
          teacherAssigns: true,
        },
      },
    },
  })
}
