import { NextResponse } from "next/server";
import { appEnv } from "@/lib/env";
import { setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    username?: string;
    password?: string;
  };

  if (
    body.username !== appEnv.ADMIN_USERNAME ||
    body.password !== appEnv.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { error: "Invalid admin credentials." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true, username: body.username });
  setAdminSession(response, body.username);
  return response;
}
