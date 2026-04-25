import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getUsers, createUser } from "@/lib/services/user.service"
import { createUserSchema } from "@/lib/validation/user.schema"

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") {
    return new NextResponse("Unauthorized", { status: 403 })
  }

  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") {
    return new NextResponse("Unauthorized", { status: 403 })
  }

  try {
    const body = await request.json()
    const parsed = createUserSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      )
    }

    const user = await createUser(parsed.data)
    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    if (error.message === "A user with this Login ID already exists.") {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
