export type ClientTag = "all" | "acne" | "aesthetics" | "hair" | "follow-up";

export interface Client {
  fullName: string;
  phone: string;
  whatsappOptIn: boolean;
  tags: ClientTag[];
  lastVisitAt?: string;
}

export interface MediaAsset {
  originalName: string;
  mimeType: string;
  storagePath: string;
  sizeInBytes: number;
  uploadedAt: string;
}

export interface Campaign {
  title: string;
  message: string;
  audience: ClientTag[];
  media?: MediaAsset[];
  scheduledAt?: string;
  status: "draft" | "scheduled" | "sent" | "failed";
}

export interface DeliveryLog {
  campaignTitle: string;
  clientPhone: string;
  status: "queued" | "delivered" | "failed";
  sentAt?: string;
  errorMessage?: string;
}
