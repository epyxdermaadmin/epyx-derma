"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  adminRoles,
  hasPermission,
  roleDefinitions,
  type AdminRole,
} from "@/lib/admin-access";
import type { AdminSession } from "@/lib/admin-auth";
import type { AdminOverview } from "@/lib/admin-data";

const tagOptions = ["acne", "pigmentation", "hair", "vitiligo", "psoriasis", "follow-up"];

type TabKey = "overview" | "clients" | "campaigns" | "media" | "delivery" | "team";

export function AdminDashboard({
  initialOverview,
  session,
}: {
  initialOverview: AdminOverview;
  session: AdminSession;
}) {
  const [overview, setOverview] = useState(initialOverview);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
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
  const [adminUsername, setAdminUsername] = useState("");
  const [adminDisplayName, setAdminDisplayName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminRole, setAdminRole] = useState<AdminRole>("whatsapp_campaigns");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const canManageClients = hasPermission(session.permissions, "clients:manage");
  const canViewClients = hasPermission(session.permissions, "clients:view");
  const canManageCampaigns = hasPermission(session.permissions, "campaigns:manage");
  const canDispatchCampaigns = hasPermission(session.permissions, "campaigns:dispatch");
  const canViewCampaigns = hasPermission(session.permissions, "campaigns:view");
  const canManageMedia = hasPermission(session.permissions, "media:manage");
  const canViewMedia = hasPermission(session.permissions, "media:view");
  const canViewDelivery = hasPermission(session.permissions, "delivery:view");
  const canManageAdmins = hasPermission(session.permissions, "admins:manage");
  const canViewAdmins = hasPermission(session.permissions, "admins:view");

  const tabs = useMemo(
    () =>
      [
        { key: "overview" as const, label: "Overview", visible: true },
        { key: "clients" as const, label: "Clients", visible: canViewClients },
        { key: "campaigns" as const, label: "Campaigns", visible: canViewCampaigns },
        { key: "media" as const, label: "Media", visible: canViewMedia },
        { key: "delivery" as const, label: "Delivery", visible: canViewDelivery },
        { key: "team" as const, label: "Admin Team", visible: canViewAdmins },
      ].filter((tab) => tab.visible),
    [canViewAdmins, canViewCampaigns, canViewClients, canViewDelivery, canViewMedia],
  );

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

  async function handleAdminCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("admin-user");
    setFeedback(null);

    const response = await fetch("/api/admin/admin-users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: adminUsername,
        displayName: adminDisplayName,
        password: adminPassword,
        role: adminRole,
      }),
    });

    setBusy(null);

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string; details?: string };
      setFeedback(payload.details || payload.error || "Unable to create admin user.");
      return;
    }

    setAdminUsername("");
    setAdminDisplayName("");
    setAdminPassword("");
    setAdminRole("whatsapp_campaigns");
    setFeedback("Admin user created.");
    await refreshOverview();
  }

  const statCards = useMemo(
    () => [
      ...(canViewClients
        ? [
            { label: "Clients", value: overview.stats.clients },
            { label: "WhatsApp opt-ins", value: overview.stats.optedInClients },
          ]
        : []),
      ...(canViewCampaigns
        ? [{ label: "Campaigns", value: overview.stats.campaigns }]
        : []),
      ...(canViewMedia
        ? [{ label: "Media assets", value: overview.stats.mediaAssets }]
        : []),
      ...(canViewDelivery
        ? [{ label: "Delivery logs", value: overview.stats.deliveryLogs }]
        : []),
      ...(canViewAdmins ? [{ label: "Admin users", value: overview.stats.adminUsers }] : []),
    ],
    [
      canViewAdmins,
      canViewCampaigns,
      canViewClients,
      canViewDelivery,
      canViewMedia,
      overview.stats,
    ],
  );

  const activeRoleDefinition = roleDefinitions[session.role];

  return (
    <section className="admin-workspace">
      <div className="admin-toolbar">
        <div>
          <span className="eyebrow">Operational workspace</span>
          <h2>
            Welcome, {session.displayName}
            <span className="admin-role-chip">{activeRoleDefinition.label}</span>
          </h2>
          <p>{activeRoleDefinition.description}</p>
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

      <div className="admin-tabs" role="tablist" aria-label="Admin sections">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`admin-tab${activeTab === tab.key ? " admin-tab--active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {feedback ? <p className="form-success">{feedback}</p> : null}

      {activeTab === "overview" ? (
        <div className="admin-tab-panel">
          <div className="admin-layout-grid">
            <article className="admin-card">
              <h3>Your access</h3>
              <p>
                Signed in as <strong>{session.username}</strong> with the <strong>{activeRoleDefinition.label}</strong> role.
              </p>
              <div className="tag-picker">
                {session.permissions.map((permission) => (
                  <span key={permission} className="tag-chip tag-chip--active">
                    {permission}
                  </span>
                ))}
              </div>
            </article>
            <article className="admin-card">
              <h3>Role map</h3>
              <div className="mini-list">
                {Object.entries(roleDefinitions).map(([role, definition]) => (
                  <div key={role} className="mini-list__item">
                    <strong>{definition.label}</strong>
                    <span>{definition.description}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
          {canViewDelivery ? (
            <article className="admin-card">
              <h3>Recent delivery activity</h3>
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
          ) : null}
        </div>
      ) : null}

      {activeTab === "clients" && canViewClients ? (
        <div className="admin-tab-panel">
          <div className="admin-layout-grid">
            {canManageClients ? (
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
            ) : (
              <article className="admin-card">
                <h3>Reception workflow</h3>
                <p>This role can review client details but cannot create new client records.</p>
              </article>
            )}

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
          </div>
        </div>
      ) : null}

      {activeTab === "campaigns" && canViewCampaigns ? (
        <div className="admin-tab-panel">
          {canManageCampaigns ? (
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
          ) : null}

          <article className="admin-card">
            <h3>Campaign drafts and sends</h3>
            <div className="mini-list">
              {overview.campaigns.length ? overview.campaigns.map((campaign) => (
                <div key={campaign.id} className="mini-list__item">
                  <strong>{campaign.title}</strong>
                  <span>{campaign.status}</span>
                  <span>{campaign.audience.join(", ") || "all opted-in clients"}</span>
                  {campaign.dispatchSummary ? <span>{campaign.dispatchSummary}</span> : null}
                  {canDispatchCampaigns ? (
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => handleDispatch(campaign.id)}
                      disabled={busy === `dispatch:${campaign.id}`}
                    >
                      {busy === `dispatch:${campaign.id}` ? "Dispatching..." : "Send via WhatsApp"}
                    </button>
                  ) : null}
                </div>
              )) : <p>No campaigns drafted yet.</p>}
            </div>
          </article>
        </div>
      ) : null}

      {activeTab === "media" && canViewMedia ? (
        <div className="admin-tab-panel">
          <div className="admin-layout-grid">
            {canManageMedia ? (
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
              </form>
            ) : null}

            <article className="admin-card">
              <h3>Media library</h3>
              <div className="mini-list">
                {overview.media.length ? overview.media.map((item) => (
                  <a key={item.id} href={item.publicUrl} target="_blank" rel="noreferrer" className="mini-list__item">
                    <strong>{item.originalName}</strong>
                    <span>{item.mimeType}</span>
                    <span>{Math.round(item.sizeInBytes / 1024)} KB</span>
                  </a>
                )) : <p>No media uploaded yet.</p>}
              </div>
            </article>
          </div>
        </div>
      ) : null}

      {activeTab === "delivery" && canViewDelivery ? (
        <div className="admin-tab-panel">
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
        </div>
      ) : null}

      {activeTab === "team" && canViewAdmins ? (
        <div className="admin-tab-panel">
          <div className="admin-layout-grid">
            {canManageAdmins ? (
              <form className="admin-card admin-form" onSubmit={handleAdminCreate}>
                <h3>Add admin</h3>
                <label>
                  Username
                  <input value={adminUsername} onChange={(event) => setAdminUsername(event.target.value)} required />
                </label>
                <label>
                  Display name
                  <input value={adminDisplayName} onChange={(event) => setAdminDisplayName(event.target.value)} required />
                </label>
                <label>
                  Temporary password
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(event) => setAdminPassword(event.target.value)}
                    required
                  />
                </label>
                <label>
                  Role
                  <select value={adminRole} onChange={(event) => setAdminRole(event.target.value as AdminRole)}>
                    {adminRoles.map((role) => (
                      <option key={role} value={role}>
                        {roleDefinitions[role].label}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="button-primary" disabled={busy === "admin-user"}>
                  {busy === "admin-user" ? "Creating..." : "Create admin"}
                </button>
              </form>
            ) : (
              <article className="admin-card">
                <h3>Read-only team view</h3>
                <p>This role can review the access model but cannot create or change admin users.</p>
              </article>
            )}

            <article className="admin-card">
              <h3>Current admin users</h3>
              <div className="mini-list">
                {overview.adminUsers.length ? overview.adminUsers.map((adminUser) => (
                  <div key={adminUser.id} className="mini-list__item">
                    <strong>{adminUser.displayName}</strong>
                    <span>{adminUser.username}</span>
                    <span>{roleDefinitions[adminUser.role].label} - {adminUser.status}</span>
                  </div>
                )) : <p>No admin users available.</p>}
              </div>
            </article>
          </div>
        </div>
      ) : null}
    </section>
  );
}
