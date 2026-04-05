import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLogin } from "@/components/admin/admin-login";
import { PageHero } from "@/components/blocks/page-hero";
import { SectionShell } from "@/components/blocks/section-shell";
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
      <PageHero
        eyebrow="Operational workspace"
        title="Admin tools for client communication are now live."
        body="This route now supports secure sign-in, client management, media uploads, and campaign drafting for the upcoming WhatsApp delivery layer."
        primaryCta={{ label: session ? "Open dashboard" : "Admin sign in", href: "#admin" }}
        secondaryCta={{ label: "Return to website", href: "/" }}
        accent="dark"
      />

      <SectionShell
        eyebrow="Capabilities"
        title="Built for the next operational phase."
      >
        <div className="admin-grid">
          {adminModules.map((item) => (
            <article key={item.title} className="admin-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </SectionShell>

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
