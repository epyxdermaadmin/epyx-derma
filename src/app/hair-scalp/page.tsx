import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { SectionShell } from "@/components/blocks/section-shell";
import { buildMetadata } from "@/lib/metadata";
import { hairPrograms } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Hair and Scalp",
  description:
    "Hair-fall, scalp health, and restoration-focused care pathways built into the EpyxDerma dermatology experience.",
  path: "/hair-scalp",
});

export default function HairScalpPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Hair and scalp"
        title="Scalp health and restoration with dermatology oversight."
        body="This route gives hair concerns a dedicated home inside the brand, rather than treating them like an afterthought inside general skin messaging."
        primaryCta={{ label: "Book a hair consult", href: "/contact" }}
        accent="signature"
      />

      <SectionShell
        eyebrow="Programs"
        title="Launch-ready hair and scalp service categories."
      >
        <article className="info-card">
          <h3>Hair restoration framework</h3>
          <ul>
            {hairPrograms.map((program) => (
              <li key={program}>{program}</li>
            ))}
          </ul>
        </article>
      </SectionShell>
    </div>
  );
}
