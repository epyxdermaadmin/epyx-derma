import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLogin } from "@/components/admin/admin-login";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdminOverview } from "@/lib/admin-data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "EpyxDerma Admin",
  description:
    "Protected admin workspace for clients, uploads, campaign drafts, role-based operations, and future WhatsApp dermatology workflows.",
  path: "/epyxdermaadmin",
});

export default async function AdminPage() {
  const session = await getAdminSession();
  const overview = session ? await getAdminOverview(session) : null;

  return (
    <div className="page-shell">
      
               
        {session && overview ? (
          <>
     
      <AdminDashboard initialOverview={overview} session={session} />
          </>
          
        ) : (
          <>
               <section className="story-hero">
        <div className="container story-hero__panel">
          <div className="story-hero__grid">
            <div className="story-hero__copy">
              <span className="eyebrow">Operational workspace</span>
              <h1>Role-based admin access for the full dermatology operation.</h1>
              <p>
                This workspace now separates responsibilities for super users, campaign operators,
                receptionists, and management while keeping the super user in control of who gets
                access to what.
              </p>
            </div>
        <AdminLogin />
      
          </div>
        </div>
      </section>
    
          </>
          
        )}
{/* 
      <section className="section-shell">
        <div className="container section-shell__panel">
          <div className="section-shell__header">
            <span className="eyebrow">Access model</span>
            <h2>Different logins for different responsibilities.</h2>
            <p className="section-shell__intro">
              Super users manage the team. Campaign admins run WhatsApp work. Receptionists manage
              front-desk client intake. Management sees performance and activity in a read-only way.
            </p>
          </div>
          <div className="admin-role-grid">
            {Object.entries(roleDefinitions).map(([role, definition]) => (
              <article key={role} className="admin-card">
                <h3>{definition.label}</h3>
                <p>{definition.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
