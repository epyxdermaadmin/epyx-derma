import { ObjectId } from "mongodb";
import { z } from "zod";
import { hasPermission } from "@/lib/admin-access";
import type { AdminSession } from "@/lib/admin-auth";
import { listAdminUsers, type AdminUserRecord } from "@/lib/admin-users";
import { getDatabase } from "@/lib/mongodb";

const clientSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  whatsappOptIn: z.boolean(),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
  lastVisitAt: z.string().optional(),
});

const mediaSchema = z.object({
  originalName: z.string().min(1),
  storedName: z.string().min(1),
  mimeType: z.string().min(1),
  sizeInBytes: z.number().nonnegative(),
  relativePath: z.string().min(1),
  publicUrl: z.string().min(1),
  uploadedAt: z.string().min(1),
});

const campaignSchema = z.object({
  title: z.string().min(3),
  message: z.string().min(5),
  audience: z.array(z.string()).default([]),
  mediaIds: z.array(z.string()).default([]),
  status: z.enum(["draft", "ready", "sending", "sent", "failed"]).default("draft"),
  scheduledAt: z.string().optional(),
});

export type ClientInput = z.infer<typeof clientSchema>;
export type MediaInput = z.infer<typeof mediaSchema>;
export type CampaignInput = z.infer<typeof campaignSchema>;

export type ClientRecord = ClientInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type MediaRecord = MediaInput & {
  id: string;
};

export type CampaignRecord = CampaignInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastDispatchedAt?: string;
  dispatchSummary?: string;
};

export type DeliveryLogRecord = {
  id: string;
  campaignId: string;
  campaignTitle: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  status: "queued" | "delivered" | "failed";
  provider: string;
  providerMessageId?: string;
  errorMessage?: string;
  sentAt: string;
};

export type AdminOverview = {
  stats: {
    clients: number;
    optedInClients: number;
    campaigns: number;
    mediaAssets: number;
    deliveryLogs: number;
    adminUsers: number;
  };
  clients: ClientRecord[];
  campaigns: CampaignRecord[];
  media: MediaRecord[];
  deliveryLogs: DeliveryLogRecord[];
  adminUsers: AdminUserRecord[];
};

type ClientDocument = ClientInput & {
  _id: ObjectId;
  createdAt: string;
  updatedAt: string;
};

type MediaDocument = MediaInput & {
  _id: ObjectId;
};

type CampaignDocument = CampaignInput & {
  _id: ObjectId;
  createdAt: string;
  updatedAt: string;
  lastDispatchedAt?: string;
  dispatchSummary?: string;
};

type DeliveryLogDocument = Omit<DeliveryLogRecord, "id"> & {
  _id: ObjectId;
};

function serializeClient(document: ClientDocument): ClientRecord {
  const { _id, ...rest } = document;
  return { id: _id.toString(), ...rest };
}

function serializeMedia(document: MediaDocument): MediaRecord {
  const { _id, ...rest } = document;
  return { id: _id.toString(), ...rest };
}

function serializeCampaign(document: CampaignDocument): CampaignRecord {
  const { _id, ...rest } = document;
  return { id: _id.toString(), ...rest };
}

function serializeDeliveryLog(document: DeliveryLogDocument): DeliveryLogRecord {
  const { _id, ...rest } = document;
  return { id: _id.toString(), ...rest };
}

export async function listClients(): Promise<ClientRecord[]> {
  const db = await getDatabase();
  const docs = (await db.collection("clients").find({}).sort({ createdAt: -1 }).toArray()) as ClientDocument[];
  return docs.map(serializeClient);
}

export async function createClient(input: ClientInput): Promise<ClientRecord> {
  const value = clientSchema.parse(input);
  const db = await getDatabase();
  const now = new Date().toISOString();
  const document = { ...value, createdAt: now, updatedAt: now };
  const result = await db.collection("clients").insertOne(document);
  return { id: result.insertedId.toString(), ...document };
}

export async function listMedia(): Promise<MediaRecord[]> {
  const db = await getDatabase();
  const docs = (await db.collection("mediaAssets").find({}).sort({ uploadedAt: -1 }).toArray()) as MediaDocument[];
  return docs.map(serializeMedia);
}

export async function createMedia(input: MediaInput): Promise<MediaRecord> {
  const value = mediaSchema.parse(input);
  const db = await getDatabase();
  const result = await db.collection("mediaAssets").insertOne(value);
  return { id: result.insertedId.toString(), ...value };
}

export async function listCampaigns(): Promise<CampaignRecord[]> {
  const db = await getDatabase();
  const docs = (await db.collection("campaigns").find({}).sort({ createdAt: -1 }).toArray()) as CampaignDocument[];
  return docs.map(serializeCampaign);
}

export async function getCampaignById(id: string): Promise<CampaignRecord | null> {
  const db = await getDatabase();
  const document = (await db.collection("campaigns").findOne({ _id: new ObjectId(id) })) as CampaignDocument | null;
  return document ? serializeCampaign(document) : null;
}

export async function createCampaign(input: CampaignInput): Promise<CampaignRecord> {
  const value = campaignSchema.parse(input);
  const db = await getDatabase();
  const now = new Date().toISOString();
  const document = {
    ...value,
    createdAt: now,
    updatedAt: now,
  };
  const result = await db.collection("campaigns").insertOne(document);
  return { id: result.insertedId.toString(), ...document };
}

export async function updateCampaignStatus(
  id: string,
  status: CampaignRecord["status"],
  extra: Partial<Pick<CampaignRecord, "lastDispatchedAt" | "dispatchSummary">> = {}
): Promise<void> {
  const db = await getDatabase();
  await db.collection("campaigns").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        updatedAt: new Date().toISOString(),
        ...extra,
      },
    }
  );
}

export async function listDeliveryLogs(): Promise<DeliveryLogRecord[]> {
  const db = await getDatabase();
  const docs = (await db.collection("deliveryLogs").find({}).sort({ sentAt: -1 }).limit(20).toArray()) as DeliveryLogDocument[];
  return docs.map(serializeDeliveryLog);
}

export async function createDeliveryLog(
  input: Omit<DeliveryLogRecord, "id">
): Promise<DeliveryLogRecord> {
  const db = await getDatabase();
  const result = await db.collection("deliveryLogs").insertOne(input);
  return { id: result.insertedId.toString(), ...input };
}

export async function findAudienceClients(audience: string[]): Promise<ClientRecord[]> {
  const clients = await listClients();
  const optedIn = clients.filter((client) => client.whatsappOptIn);

  if (!audience.length) {
    return optedIn;
  }

  return optedIn.filter((client) => audience.some((tag) => client.tags.includes(tag)));
}

export async function resolveCampaignMedia(mediaIds: string[]): Promise<MediaRecord[]> {
  if (!mediaIds.length) {
    return [];
  }

  const db = await getDatabase();
  const objectIds = mediaIds.map((id) => new ObjectId(id));
  const docs = (await db
    .collection("mediaAssets")
    .find({ _id: { $in: objectIds } })
    .toArray()) as MediaDocument[];
  return docs.map(serializeMedia);
}

export async function getAdminOverview(session: AdminSession): Promise<AdminOverview> {
  const canViewClients = hasPermission(session.permissions, "clients:view");
  const canViewCampaigns = hasPermission(session.permissions, "campaigns:view");
  const canViewMedia = hasPermission(session.permissions, "media:view");
  const canViewDelivery = hasPermission(session.permissions, "delivery:view");
  const canViewAdmins = hasPermission(session.permissions, "admins:view");
  const [clients, campaigns, media, deliveryLogs, adminUsers] = await Promise.all([
    canViewClients ? listClients() : Promise.resolve([]),
    canViewCampaigns ? listCampaigns() : Promise.resolve([]),
    canViewMedia ? listMedia() : Promise.resolve([]),
    canViewDelivery ? listDeliveryLogs() : Promise.resolve([]),
    canViewAdmins ? listAdminUsers() : Promise.resolve([]),
  ]);

  return {
    stats: {
      clients: clients.length,
      optedInClients: clients.filter((client) => client.whatsappOptIn).length,
      campaigns: campaigns.length,
      mediaAssets: media.length,
      deliveryLogs: deliveryLogs.length,
      adminUsers: adminUsers.length,
    },
    clients,
    campaigns,
    media,
    deliveryLogs,
    adminUsers,
  };
}
