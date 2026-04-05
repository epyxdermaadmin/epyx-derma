import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { SectionShell } from "@/components/blocks/section-shell";
import { TreatmentGrid } from "@/components/blocks/treatment-grid";
import { buildMetadata } from "@/lib/metadata";
import { treatmentFamilies, clinicalPrograms, aestheticPrograms, hairPrograms } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Treatments",
  description:
    "Explore the dermatology, cosmetology, hair clinic, and procedure-led treatment families currently offered by EpyxDerma.",
  path: "/treatments",
});

export default function TreatmentsPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Treatment library"
        title="A clearer route into dermatology care."
        body="The treatments page now reflects the real service mix from your existing practice, organized into clinical, cosmetic, hair, and procedure-led pathways."
        primaryCta={{ label: "Book a consult", href: "/contact" }}
        secondaryCta={{ label: "Explore clinical care", href: "/clinical-dermatology" }}
      />

      <SectionShell
        eyebrow="Care families"
        title="Clinical, procedural, aesthetic, and hair pathways."
        intro="These treatment groups are now aligned to the live business rather than starter placeholder copy."
      >
        <TreatmentGrid items={treatmentFamilies} />
      </SectionShell>

      <SectionShell eyebrow="Clinical scope" title="Current dermatology conditions and procedures." tone="warm">
        <div className="info-grid">
          <article className="info-card">
            <h3>Clinical dermatology</h3>
            <ul>
              {clinicalPrograms.map((program) => (
                <li key={program}>{program}</li>
              ))}
            </ul>
          </article>
          <article className="info-card">
            <h3>Cosmetology and aesthetics</h3>
            <ul>
              {aestheticPrograms.map((program) => (
                <li key={program}>{program}</li>
              ))}
            </ul>
          </article>
          <article className="info-card">
            <h3>Hair and scalp</h3>
            <ul>
              {hairPrograms.map((program) => (
                <li key={program}>{program}</li>
              ))}
            </ul>
          </article>
        </div>
      </SectionShell>
    </div>
  );
}
