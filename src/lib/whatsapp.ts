import { appEnv } from "@/lib/env";
import type { CampaignRecord, ClientRecord, MediaRecord } from "@/lib/admin-data";

type DispatchPayload = {
  campaign: CampaignRecord;
  client: ClientRecord;
  media: MediaRecord[];
};

type DispatchResult = {
  status: "delivered" | "failed";
  provider: string;
  providerMessageId?: string;
  errorMessage?: string;
};

function formatPhoneNumber(rawPhone: string) {
  const digits = rawPhone.replace(/\D/g, "");
  if (!digits) {
    return rawPhone;
  }
  if (digits.startsWith(appEnv.WHATSAPP_DEFAULT_COUNTRY_CODE)) {
    return digits;
  }
  return `${appEnv.WHATSAPP_DEFAULT_COUNTRY_CODE}${digits}`;
}

async function sendViaMeta({ campaign, client, media }: DispatchPayload): Promise<DispatchResult> {
  if (!appEnv.WHATSAPP_ACCESS_TOKEN || !appEnv.WHATSAPP_PHONE_NUMBER_ID) {
    return {
      status: "failed",
      provider: "meta",
      errorMessage: "Meta WhatsApp credentials are not configured in the environment.",
    };
  }

  const endpoint = `https://graph.facebook.com/${appEnv.WHATSAPP_API_VERSION}/${appEnv.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const firstMedia = media[0];

  const baseBody: Record<string, unknown> = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: formatPhoneNumber(client.phone),
  };

  let body: Record<string, unknown>;

  if (firstMedia) {
    const mediaType = firstMedia.mimeType.startsWith("video/") ? "video" : "image";
    body = {
      ...baseBody,
      type: mediaType,
      [mediaType]: {
        link: `${appEnv.NEXT_PUBLIC_SITE_URL}${firstMedia.publicUrl}`,
        caption: `${campaign.title}\n\n${campaign.message}`,
      },
    };
  } else {
    body = {
      ...baseBody,
      type: "text",
      text: {
        preview_url: false,
        body: `${campaign.title}\n\n${campaign.message}`,
      },
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${appEnv.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json()) as {
    messages?: Array<{ id?: string }>;
    error?: { message?: string };
  };

  if (!response.ok) {
    return {
      status: "failed",
      provider: "meta",
      errorMessage: payload.error?.message || "Meta WhatsApp API request failed.",
    };
  }

  return {
    status: "delivered",
    provider: "meta",
    providerMessageId: payload.messages?.[0]?.id,
  };
}

export async function dispatchCampaignToClient(payload: DispatchPayload): Promise<DispatchResult> {
  if (appEnv.WHATSAPP_PROVIDER === "disabled") {
    return {
      status: "failed",
      provider: "disabled",
      errorMessage: "WhatsApp provider is disabled.",
    };
  }

  return sendViaMeta(payload);
}
