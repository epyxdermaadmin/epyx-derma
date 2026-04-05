import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLogin } from "@/components/admin/admin-login";
import { adminModules } from "@/content/site";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdminOverview } from "@/lib/admin-data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "EpyxDerma Admin",
  description:
    "Protected admin workspace for clients, uploads, campaign drafts, and future WhatsApp dermatology operations.",
  path: "/epyxdermaadmin",
});

export default async function AdminPage() {
  const session = await getAdminSession();
  const overview = session ? await getAdminOverview() : null;

  return (
    <div className="page-shell">
      <section className="story-hero">
        <div className="container story-hero__panel">
          <div className="story-hero__grid">
            <div className="story-hero__copy">
              <span className="eyebrow">Operational workspace</span>
              <h1>Admin tools for client communication are now live.</h1>
              <p>
                This route supports secure sign-in, client management, media uploads, and
                campaign drafting for the upcoming WhatsApp delivery layer.
              </p>
            </div>
            <article className="story-hero__note">
              <strong>{session ? "Signed-in workflow" : "Protected access"}</strong>
              <span>
                {session
                  ? "You can work with clients, uploads, campaigns, and delivery logs from one place."
                  : "Use your admin credentials to enter the internal workspace."}
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container section-shell__panel">
          <div className="section-shell__header">
            <span className="eyebrow">Capabilities</span>
            <h2>Built for the next operational phase.</h2>
          </div>
        <div className="admin-grid">
          {adminModules.map((item) => (
            <article key={item.title} className="admin-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <div id="admin" className="container">
        {session && overview ? (
          <AdminDashboard initialOverview={overview} username={session.username} />
        ) : (
          <AdminLogin />
        )}
      </div>
    </div>
  );
}
