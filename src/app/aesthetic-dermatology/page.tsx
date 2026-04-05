import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { SectionShell } from "@/components/blocks/section-shell";
import { buildMetadata } from "@/lib/metadata";
import { aestheticPrograms } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Aesthetic Dermatology",
  description:
    "Luxury-forward aesthetic dermatology for glow restoration, resurfacing, age-management, lasers, peels, and skin confidence.",
  path: "/aesthetic-dermatology",
});

export default function AestheticDermatologyPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Aesthetic dermatology"
        title="Refined, natural-looking skin enhancement."
        body="This section positions EpyxDerma for premium cosmetic dermatology with a tone that feels elevated rather than sales-heavy."
        primaryCta={{ label: "Start an aesthetic consult", href: "/contact" }}
        secondaryCta={{ label: "See treatment families", href: "/treatments" }}
        accent="warm"
      />

      <SectionShell
        eyebrow="Signature services"
        title="An intentionally premium service vocabulary."
        tone="warm"
      >
        <article className="info-card">
          <h3>Aesthetic starter menu</h3>
          <ul>
            {aestheticPrograms.map((program) => (
              <li key={program}>{program}</li>
            ))}
          </ul>
        </article>
      </SectionShell>
    </div>
  );
}
