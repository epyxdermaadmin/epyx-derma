import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { hasPermission, type AdminPermission } from "@/lib/admin-access";
import { appEnv } from "@/lib/env";
import { findAdminUserById, type AdminAuthRecord } from "@/lib/admin-users";

const SESSION_COOKIE = "epyxderma_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

type SessionPayload = {
  adminId: string;
  exp: number;
};

export type AdminSession = Omit<AdminAuthRecord, "passwordHash">;

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", appEnv.ADMIN_SESSION_SECRET)
    .update(value)
    .digest("base64url");
}

function toAdminSession(record: AdminAuthRecord): AdminSession {
  return {
    id: record.id,
    username: record.username,
    displayName: record.displayName,
    role: record.role,
    status: record.status,
    permissions: record.permissions,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    createdBy: record.createdBy,
  };
}

export function createSessionToken(adminId: string) {
  const payload: SessionPayload = {
    adminId,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };

  const encoded = toBase64Url(JSON.stringify(payload));
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) {
    return null;
  }

  const expected = sign(encoded);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) {
    return null;
  }

  const valid = timingSafeEqual(actualBuffer, expectedBuffer);

  if (!valid) {
    return null;
  }

  const payload = JSON.parse(fromBase64Url(encoded)) as SessionPayload;
  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const payload = verifySessionToken(store.get(SESSION_COOKIE)?.value ?? null);

  if (!payload) {
    return null;
  }

  const adminUser = await findAdminUserById(payload.adminId);
  if (!adminUser || adminUser.status !== "active") {
    return null;
  }

  return toAdminSession(adminUser);
}

export function setAdminSession(response: NextResponse, adminId: string) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: createSessionToken(adminId),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function assertAdminSession(permission?: AdminPermission) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  if (permission && !hasPermission(session.permissions, permission)) {
    throw new Error("FORBIDDEN");
  }

  return session;
}
