import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-auth";
import { createClient, listClients } from "@/lib/admin-data";

export async function GET() {
  try {
    await assertAdminSession("clients:view");
    return NextResponse.json({ clients: await listClients() });
  } catch (error) {
    const status =
      error instanceof Error && error.message === "UNAUTHORIZED"
        ? 401
        : error instanceof Error && error.message === "FORBIDDEN"
          ? 403
          : 500;
    return NextResponse.json({ error: "Unable to load clients." }, { status });
  }
}

export async function POST(request: Request) {
  try {
    await assertAdminSession("clients:manage");
    const body = await request.json();
    const client = await createClient(body);
    return NextResponse.json({ client }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    return NextResponse.json(
      { error: "Unable to save client.", details: error instanceof Error ? error.message : undefined },
      { status: 400 }
    );
  }
}
