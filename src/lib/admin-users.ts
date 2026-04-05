import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { ObjectId } from "mongodb";
import { z } from "zod";
import {
  adminRoles,
  adminStatuses,
  getPermissionsForRole,
  type AdminRole,
  type AdminStatus,
} from "@/lib/admin-access";
import { appEnv } from "@/lib/env";
import { getDatabase } from "@/lib/mongodb";

const SCRYPT_N = 1 << 15;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LENGTH = 64;

function resolveScryptMaxmem(n: number, r: number, p: number) {
  return 256 * n * r * p;
}

const adminUserCreateSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z0-9._-]+$/)
    .transform((value) => value.trim().toLowerCase()),
  displayName: z.string().min(2).max(80).transform((value) => value.trim()),
  password: z.string().min(8).max(128),
  role: z.enum(adminRoles),
});

type AdminUserDocument = {
  _id: ObjectId;
  username: string;
  displayName: string;
  role: AdminRole;
  status: AdminStatus;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
};

export type AdminUserRecord = {
  id: string;
  username: string;
  displayName: string;
  role: AdminRole;
  status: AdminStatus;
  permissions: ReturnType<typeof getPermissionsForRole>;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
};

export type AdminAuthRecord = AdminUserRecord & {
  passwordHash: string;
};

function serializeAdminUser(document: AdminUserDocument): AdminUserRecord {
  return {
    id: document._id.toString(),
    username: document.username,
    displayName: document.displayName,
    role: document.role,
    status: document.status,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    createdBy: document.createdBy,
    permissions: getPermissionsForRole(document.role),
  };
}

function serializeAdminAuthUser(document: AdminUserDocument): AdminAuthRecord {
  const { _id, ...rest } = document;

  return {
    id: _id.toString(),
    ...rest,
    permissions: getPermissionsForRole(document.role),
  };
}

async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
    maxmem: resolveScryptMaxmem(SCRYPT_N, SCRYPT_R, SCRYPT_P),
  });

  return [
    "scrypt",
    SCRYPT_N.toString(),
    SCRYPT_R.toString(),
    SCRYPT_P.toString(),
    salt.toString("base64url"),
    derived.toString("base64url"),
  ].join("$");
}

async function verifyPassword(password: string, passwordHash: string) {
  const [algorithm, nString, rString, pString, saltString, hashString] =
    passwordHash.split("$");

  if (
    algorithm !== "scrypt" ||
    !nString ||
    !rString ||
    !pString ||
    !saltString ||
    !hashString
  ) {
    return false;
  }

  const salt = Buffer.from(saltString, "base64url");
  const expected = Buffer.from(hashString, "base64url");
  const n = Number(nString);
  const r = Number(rString);
  const p = Number(pString);
  const derived = scryptSync(password, salt, expected.length, {
    N: n,
    r,
    p,
    maxmem: resolveScryptMaxmem(n, r, p),
  });

  return (
    derived.length === expected.length && timingSafeEqual(derived, expected)
  );
}

export async function ensureSuperAdmin() {
  const db = await getDatabase();
  const adminUsers = db.collection("adminUsers");
  const username = appEnv.ADMIN_USERNAME.trim().toLowerCase();
  const existing = (await adminUsers.findOne({
    username,
  })) as AdminUserDocument | null;

  if (existing) {
    return serializeAdminAuthUser(existing);
  }

  const now = new Date().toISOString();
  const document = {
    username,
    displayName: "Super User",
    role: "super_user" as const,
    status: "active" as const,
    passwordHash: await hashPassword(appEnv.ADMIN_PASSWORD),
    createdAt: now,
    updatedAt: now,
    createdBy: "bootstrap",
  };

  const result = await adminUsers.insertOne(document);

  return {
    id: result.insertedId.toString(),
    ...document,
    permissions: getPermissionsForRole(document.role),
  };
}

export async function findAdminUserById(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDatabase();
  const document = (await db.collection("adminUsers").findOne({
    _id: new ObjectId(id),
  })) as AdminUserDocument | null;

  return document ? serializeAdminAuthUser(document) : null;
}

export async function authenticateAdmin(username: string, password: string) {
  await ensureSuperAdmin();

  const db = await getDatabase();
  const document = (await db.collection("adminUsers").findOne({
    username: username.trim().toLowerCase(),
  })) as AdminUserDocument | null;

  if (!document || document.status !== "active") {
    return null;
  }

  const valid = await verifyPassword(password, document.passwordHash);
  return valid ? serializeAdminAuthUser(document) : null;
}

export async function listAdminUsers(): Promise<AdminUserRecord[]> {
  await ensureSuperAdmin();
  const db = await getDatabase();
  const documents = (await db
    .collection("adminUsers")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()) as AdminUserDocument[];

  return documents.map(serializeAdminUser);
}

export async function createAdminUser(
  input: z.input<typeof adminUserCreateSchema>,
  createdBy: string,
): Promise<AdminUserRecord> {
  await ensureSuperAdmin();
  const value = adminUserCreateSchema.parse(input);
  const db = await getDatabase();
  const existing = await db.collection("adminUsers").findOne({
    username: value.username,
  });

  if (existing) {
    throw new Error("An admin with that username already exists.");
  }

  const now = new Date().toISOString();
  const document = {
    username: value.username,
    displayName: value.displayName,
    role: value.role,
    status: adminStatuses[0],
    passwordHash: await hashPassword(value.password),
    createdAt: now,
    updatedAt: now,
    createdBy,
  };

  const result = await db.collection("adminUsers").insertOne(document);

  return {
    id: result.insertedId.toString(),
    ...document,
    permissions: getPermissionsForRole(document.role),
  };
}
