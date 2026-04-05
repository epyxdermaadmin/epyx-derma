import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-auth";
import {
  createDeliveryLog,
  findAudienceClients,
  getCampaignById,
  resolveCampaignMedia,
  updateCampaignStatus,
} from "@/lib/admin-data";
import { dispatchCampaignToClient } from "@/lib/whatsapp";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await assertAdminSession();
    const { id } = await context.params;
    const campaign = await getCampaignById(id);

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found." }, { status: 404 });
    }

    await updateCampaignStatus(id, "sending");

    const [audienceClients, media] = await Promise.all([
      findAudienceClients(campaign.audience),
      resolveCampaignMedia(campaign.mediaIds),
    ]);

    if (!audienceClients.length) {
      await updateCampaignStatus(id, "failed", {
        lastDispatchedAt: new Date().toISOString(),
        dispatchSummary: "No opted-in clients matched the selected audience.",
      });
      return NextResponse.json(
        { error: "No opted-in clients matched the selected audience." },
        { status: 400 }
      );
    }

    let delivered = 0;
    let failed = 0;

    for (const client of audienceClients) {
      const result = await dispatchCampaignToClient({
        campaign,
        client,
        media,
      });

      if (result.status === "delivered") {
        delivered += 1;
      } else {
        failed += 1;
      }

      await createDeliveryLog({
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        clientId: client.id,
        clientName: client.fullName,
        clientPhone: client.phone,
        status: result.status,
        provider: result.provider,
        providerMessageId: result.providerMessageId,
        errorMessage: result.errorMessage,
        sentAt: new Date().toISOString(),
      });
    }

    const finalStatus = failed === 0 ? "sent" : delivered > 0 ? "sent" : "failed";
    const summary = `Delivered: ${delivered}, Failed: ${failed}, Audience size: ${audienceClients.length}`;

    await updateCampaignStatus(id, finalStatus, {
      lastDispatchedAt: new Date().toISOString(),
      dispatchSummary: summary,
    });

    return NextResponse.json({
      ok: true,
      delivered,
      failed,
      audienceSize: audienceClients.length,
      summary,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Unable to dispatch campaign.", details: error instanceof Error ? error.message : undefined },
      { status: 500 }
    );
  }
}
