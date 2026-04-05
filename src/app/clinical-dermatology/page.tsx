import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/cta-band";
import { PageHero } from "@/components/blocks/page-hero";
import { SectionShell } from "@/components/blocks/section-shell";
import { buildMetadata } from "@/lib/metadata";
import { clinicalPrograms } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Clinical Dermatology",
  description:
    "Condition-focused medical dermatology care for acne, pigmentation, eczema, psoriasis, infections, and long-term skin health.",
  path: "/clinical-dermatology",
});

export default function ClinicalDermatologyPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Clinical dermatology"
        title="Evidence-led care for complex everyday skin concerns."
        body="The brand language stays polished, but the clinical offering remains grounded in diagnosis, disease management, and meaningful follow-up planning."
        primaryCta={{ label: "Discuss skin concerns", href: "/contact" }}
        accent="dark"
      />

      <SectionShell
        eyebrow="Program focus"
        title="Conditions this website is prepared to speak about."
      >
        <article className="info-card">
          <h3>Launch-ready clinical scope</h3>
          <ul>
            {clinicalPrograms.map((program) => (
              <li key={program}>{program}</li>
            ))}
          </ul>
        </article>
      </SectionShell>

      <CtaBand
        title="Need condition-specific pages later?"
        body="The site structure is already ready for dedicated acne, pigmentation, eczema, psoriasis, and paediatric dermatology subpages in a future iteration."
        primaryCta={{ label: "View all treatments", href: "/treatments" }}
      />
    </div>
  );
}
