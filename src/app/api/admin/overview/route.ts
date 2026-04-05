import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-auth";
import { getAdminOverview } from "@/lib/admin-data";

export async function GET() {
  try {
    const session = await assertAdminSession("dashboard:view");
    const overview = await getAdminOverview(session);
    return NextResponse.json(overview);
  } catch (error) {
    const status =
      error instanceof Error && error.message === "UNAUTHORIZED"
        ? 401
        : error instanceof Error && error.message === "FORBIDDEN"
          ? 403
          : 500;
    return NextResponse.json({ error: "Unable to load admin overview." }, { status });
  }
}
