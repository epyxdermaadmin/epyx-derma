import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-auth";
import { createAdminUser, listAdminUsers } from "@/lib/admin-users";

export async function GET() {
  try {
    await assertAdminSession("admins:view");
    return NextResponse.json({ adminUsers: await listAdminUsers() });
  } catch (error) {
    const status =
      error instanceof Error && error.message === "UNAUTHORIZED"
        ? 401
        : error instanceof Error && error.message === "FORBIDDEN"
          ? 403
          : 500;
    return NextResponse.json({ error: "Unable to load admin users." }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const session = await assertAdminSession("admins:manage");
    const body = await request.json();
    const adminUser = await createAdminUser(body, session.username);
    return NextResponse.json({ adminUser }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    return NextResponse.json(
      {
        error: "Unable to create admin user.",
        details: error instanceof Error ? error.message : undefined,
      },
      { status: 400 },
    );
  }
}

