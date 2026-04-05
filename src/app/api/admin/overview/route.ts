import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-auth";
import { getAdminOverview } from "@/lib/admin-data";

export async function GET() {
  try {
    await assertAdminSession();
    const overview = await getAdminOverview();
    return NextResponse.json(overview);
  } catch (error) {
    const status = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: "Unable to load admin overview." }, { status });
  }
}
