import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { appEnv } from "@/lib/env";

export const runtime = "nodejs";

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await context.params;
  const relative = segments.join("/");
  const filePath = path.join(process.cwd(), appEnv.UPLOAD_DIR, relative);

  try {
    const data = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();

    return new NextResponse(data, {
      headers: {
        "Content-Type": mimeTypes[extension] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }
}
