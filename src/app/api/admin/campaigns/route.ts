import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-auth";
import { createCampaign, listCampaigns } from "@/lib/admin-data";

export async function GET() {
  try {
    await assertAdminSession();
    return NextResponse.json({ campaigns: await listCampaigns() });
  } catch (error) {
    const status = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: "Unable to load campaigns." }, { status });
  }
}

export async function POST(request: Request) {
  try {
    await assertAdminSession();
    const body = await request.json();
    const campaign = await createCampaign(body);
    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Unable to save campaign.", details: error instanceof Error ? error.message : undefined },
      { status: 400 }
    );
  }
}
