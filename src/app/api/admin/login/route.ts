import { NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/admin-users";
import { setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    username?: string;
    password?: string;
  };

  if (!body.username || !body.password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    );
  }

  const adminUser = await authenticateAdmin(body.username, body.password);

  if (!adminUser) {
    return NextResponse.json(
      { error: "Invalid admin credentials." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    ok: true,
    username: adminUser.username,
    role: adminUser.role,
  });
  setAdminSession(response, adminUser.id);
  return response;
}
