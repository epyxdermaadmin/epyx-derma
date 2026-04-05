import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-auth";
import { createMedia, listMedia } from "@/lib/admin-data";
import { appEnv } from "@/lib/env";

export const runtime = "nodejs";

export async function GET() {
  try {
    await assertAdminSession();
    return NextResponse.json({ media: await listMedia() });
  } catch (error) {
    const status = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: "Unable to load media." }, { status });
  }
}

export async function POST(request: Request) {
  try {
    await assertAdminSession();
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
    const storedName = `${randomUUID()}-${safeName}`;
    const uploadRoot = path.join(process.cwd(), appEnv.UPLOAD_DIR);
    await mkdir(uploadRoot, { recursive: true });
    const filePath = path.join(uploadRoot, storedName);
    await writeFile(filePath, bytes);

    const media = await createMedia({
      originalName: file.name,
      storedName,
      mimeType: file.type || "application/octet-stream",
      sizeInBytes: file.size,
      relativePath: storedName,
      publicUrl: `/uploads/${storedName}`,
      uploadedAt: new Date().toISOString(),
    });

    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Unable to upload media.", details: error instanceof Error ? error.message : undefined },
      { status: 400 }
    );
  }
}
