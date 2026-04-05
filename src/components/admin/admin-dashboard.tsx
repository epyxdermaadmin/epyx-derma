"use client";

import { FormEvent, useMemo, useState } from "react";
import type { AdminOverview } from "@/lib/admin-data";

const tagOptions = ["acne", "pigmentation", "hair", "vitiligo", "psoriasis", "follow-up"];

export function AdminDashboard({
  initialOverview,
  username,
}: {
  initialOverview: AdminOverview;
  username: string;
}) {
  const [overview, setOverview] = useState(initialOverview);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientTags, setClientTags] = useState<string[]>([]);
  const [clientNotes, setClientNotes] = useState("");
  const [clientOptIn, setClientOptIn] = useState(true);
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");
  const [campaignAudience, setCampaignAudience] = useState<string[]>([]);
  const [campaignMedia, setCampaignMedia] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function refreshOverview() {
    const response = await fetch("/api/admin/overview", { cache: "no-store" });
    if (response.ok) {
      setOverview((await response.json()) as AdminOverview);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  async function handleClientSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("client");
    setFeedback(null);

    const response = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: clientName,
        phone: clientPhone,
        whatsappOptIn: clientOptIn,
        tags: clientTags,
        notes: clientNotes || undefined,
      }),
    });

    setBusy(null);

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string; details?: string };
      setFeedback(payload.details || payload.error || "Unable to save client.");
      return;
    }

    setClientName("");
    setClientPhone("");
    setClientTags([]);
    setClientNotes("");
    setClientOptIn(true);
    setFeedback("Client saved.");
    await refreshOverview();
  }

  async function handleMediaUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) {
      setFeedback("Choose a photo or video first.");
      return;
    }

    setBusy("media");
    setFeedback(null);
    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("/api/admin/media", {
      method: "POST",
      body: formData,
    });

    setBusy(null);

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string; details?: string };
      setFeedback(payload.details || payload.error || "Unable to upload media.");
      return;
    }

    setSelectedFile(null);
    setFeedback("Media uploaded.");
    await refreshOverview();
  }

  async function handleCampaignSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("campaign");
    setFeedback(null);

    const response = await fetch("/api/admin/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: campaignTitle,
        message: campaignMessage,
        audience: campaignAudience,
        mediaIds: campaignMedia,
        status: "draft",
      }),
    });

    setBusy(null);

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string; details?: string };
      setFeedback(payload.details || payload.error || "Unable to save campaign.");
      return;
    }

    setCampaignTitle("");
    setCampaignMessage("");
    setCampaignAudience([]);
    setCampaignMedia([]);
    setFeedback("Campaign saved as draft.");
    await refreshOverview();
  }

  async function handleDispatch(campaignId: string) {
    setBusy(`dispatch:${campaignId}`);
    setFeedback(null);

    const response = await fetch(`/api/admin/campaigns/${campaignId}/dispatch`, {
      method: "POST",
    });

    setBusy(null);

    const payload = (await response.json()) as {
      error?: string;
      details?: string;
      summary?: string;
    };

    if (!response.ok) {
      setFeedback(payload.details || payload.error || "Unable to dispatch campaign.");
      return;
    }

    setFeedback(payload.summary || "Campaign dispatched.");
    await refreshOverview();
  }

  const statCards = useMemo(
    () => [
      { label: "Clients", value: overview.stats.clients },
      { label: "WhatsApp opt-ins", value: overview.stats.optedInClients },
      { label: "Campaigns", value: overview.stats.campaigns },
      { label: "Media assets", value: overview.stats.mediaAssets },
      { label: "Delivery logs", value: overview.stats.deliveryLogs },
    ],
    [overview.stats]
  );

  return (
    <section className="admin-workspace">
      <div className="admin-toolbar">
        <div>
          <span className="eyebrow">Operational workspace</span>
          <h2>Welcome, {username}</h2>
          <p>
            Manage opted-in clients, upload campaign media, and dispatch WhatsApp-ready posts.
          </p>
        </div>
        <button type="button" className="button-secondary" onClick={handleLogout}>
          Sign out
        </button>
      </div>

      <div className="metrics-grid admin-stats-grid">
        {statCards.map((item) => (
          <div key={item.label} className="metric-card">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {feedback ? <p className="form-success">{feedback}</p> : null}

      <div className="admin-layout-grid">
        <form className="admin-card admin-form" onSubmit={handleClientSubmit}>
          <h3>Add client</h3>
          <label>
            Full name
            <input value={clientName} onChange={(event) => setClientName(event.target.value)} required />
          </label>
          <label>
            Phone
            <input value={clientPhone} onChange={(event) => setClientPhone(event.target.value)} required />
          </label>
          <label>
            Notes
            <textarea value={clientNotes} onChange={(event) => setClientNotes(event.target.value)} rows={4} />
          </label>
          <label className="checkbox-row">
            <input type="checkbox" checked={clientOptIn} onChange={(event) => setClientOptIn(event.target.checked)} />
            WhatsApp opt-in confirmed
          </label>
          <div className="tag-picker">
            {tagOptions.map((tag) => (
              <label key={tag} className={`tag-chip${clientTags.includes(tag) ? " tag-chip--active" : ""}`}>
                <input
                  type="checkbox"
                  checked={clientTags.includes(tag)}
                  onChange={(event) => {
                    setClientTags((current) =>
                      event.target.checked
                        ? [...current, tag]
                        : current.filter((item) => item !== tag)
                    );
                  }}
                />
                {tag}
              </label>
            ))}
          </div>
          <button type="submit" className="button-primary" disabled={busy === "client"}>
            {busy === "client" ? "Saving..." : "Save client"}
          </button>
        </form>

        <form className="admin-card admin-form" onSubmit={handleMediaUpload}>
          <h3>Upload campaign media</h3>
          <label>
            Photo or video
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <button type="submit" className="button-primary" disabled={busy === "media"}>
            {busy === "media" ? "Uploading..." : "Upload media"}
          </button>
          <div className="mini-list">
            {overview.media.slice(0, 4).map((item) => (
              <a key={item.id} href={item.publicUrl} target="_blank" rel="noreferrer">
                {item.originalName}
              </a>
            ))}
          </div>
        </form>
      </div>

      <form className="admin-card admin-form" onSubmit={handleCampaignSubmit}>
        <h3>Create campaign draft</h3>
        <label>
          Title
          <input value={campaignTitle} onChange={(event) => setCampaignTitle(event.target.value)} required />
        </label>
        <label>
          Message
          <textarea value={campaignMessage} onChange={(event) => setCampaignMessage(event.target.value)} rows={5} required />
        </label>
        <div className="admin-layout-grid">
          <div>
            <strong className="field-label">Audience tags</strong>
            <div className="tag-picker">
              {tagOptions.map((tag) => (
                <label key={tag} className={`tag-chip${campaignAudience.includes(tag) ? " tag-chip--active" : ""}`}>
                  <input
                    type="checkbox"
                    checked={campaignAudience.includes(tag)}
                    onChange={(event) => {
                      setCampaignAudience((current) =>
                        event.target.checked
                          ? [...current, tag]
                          : current.filter((item) => item !== tag)
                      );
                    }}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
          <div>
            <strong className="field-label">Attach uploaded media</strong>
            <div className="tag-picker">
              {overview.media.map((item) => (
                <label key={item.id} className={`tag-chip${campaignMedia.includes(item.id) ? " tag-chip--active" : ""}`}>
                  <input
                    type="checkbox"
                    checked={campaignMedia.includes(item.id)}
                    onChange={(event) => {
                      setCampaignMedia((current) =>
                        event.target.checked
                          ? [...current, item.id]
                          : current.filter((value) => value !== item.id)
                      );
                    }}
                  />
                  {item.originalName}
                </label>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="button-primary" disabled={busy === "campaign"}>
          {busy === "campaign" ? "Saving..." : "Save campaign draft"}
        </button>
      </form>

      <div className="admin-layout-grid">
        <article className="admin-card">
          <h3>Recent clients</h3>
          <div className="mini-list">
            {overview.clients.length ? overview.clients.map((client) => (
              <div key={client.id} className="mini-list__item">
                <strong>{client.fullName}</strong>
                <span>{client.phone}</span>
                <span>{client.tags.join(", ") || "general"}</span>
              </div>
            )) : <p>No clients added yet.</p>}
          </div>
        </article>

        <article className="admin-card">
          <h3>Campaign drafts and sends</h3>
          <div className="mini-list">
            {overview.campaigns.length ? overview.campaigns.map((campaign) => (
              <div key={campaign.id} className="mini-list__item">
                <strong>{campaign.title}</strong>
                <span>{campaign.status}</span>
                <span>{campaign.audience.join(", ") || "all opted-in clients"}</span>
                {campaign.dispatchSummary ? <span>{campaign.dispatchSummary}</span> : null}
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => handleDispatch(campaign.id)}
                  disabled={busy === `dispatch:${campaign.id}`}
                >
                  {busy === `dispatch:${campaign.id}` ? "Dispatching..." : "Send via WhatsApp"}
                </button>
              </div>
            )) : <p>No campaigns drafted yet.</p>}
          </div>
        </article>
      </div>

      <article className="admin-card">
        <h3>Recent delivery logs</h3>
        <div className="mini-list">
          {overview.deliveryLogs.length ? overview.deliveryLogs.map((log) => (
            <div key={log.id} className="mini-list__item">
              <strong>{log.campaignTitle}</strong>
              <span>{log.clientName} - {log.clientPhone}</span>
              <span>{log.status} via {log.provider}</span>
              {log.errorMessage ? <span>{log.errorMessage}</span> : null}
            </div>
          )) : <p>No delivery logs yet.</p>}
        </div>
      </article>
    </section>
  );
}
