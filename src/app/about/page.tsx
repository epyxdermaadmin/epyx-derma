import Image from "next/image";
import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/cta-band";
import { PageHero } from "@/components/blocks/page-hero";
import { SectionShell } from "@/components/blocks/section-shell";
import {
  aboutPillars,
  contactCards,
  doctorProfile,
  legacyGalleryImages,
  testimonials,
} from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn about the dermatology-focused EpyxDerma brand, led by Dr. A. Suhasini and adapted from the skin-care side of the existing Neo Vision & Skin Hospital practice.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="About the brand"
        title="A dedicated dermatology identity shaped from your existing practice."
        body="EpyxDerma repositions the skin and cosmetology side of your current hospital into a focused dermatology-first brand while preserving the real clinical offering, doctor identity, and contact footprint from the live business."
        primaryCta={{ label: "See treatments", href: "/treatments" }}
        secondaryCta={{ label: "Contact the hospital", href: "/contact" }}
        accent="warm"
        imageSrc={doctorProfile.image}
        imageAlt={doctorProfile.name}
        chips={["Skin specialist", "Cosmetologist", "Madhurawada"]}
      />

      <SectionShell
        eyebrow="Doctor profile"
        title={doctorProfile.name}
        intro={doctorProfile.summary}
      >
        <div className="portrait-layout">
          <div className="portrait-card">
            <Image
              src={doctorProfile.image}
              alt={doctorProfile.name}
              width={520}
              height={620}
              className="portrait-card__image"
            />
          </div>
          <article className="info-card">
            <h3>{doctorProfile.title}</h3>
            <p>
              The source website presents Dr. A. Suhasini as a specialist in skin, hair, nail,
              oral mucosa, cosmetology, and laser issue care. This new site keeps that real scope
              while giving it a more focused and premium brand expression.
            </p>
          </article>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Brand pillars"
        title="Purpose-built for long-term differentiation."
        intro="The new site keeps your real dermatology business identity while giving it a cleaner and more premium presentation layer."
      >
        <div className="feature-grid">
          {aboutPillars.map((item, index) => (
            <article key={item.title} className="feature-card">
              <span className="feature-index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Operational continuity"
        title="Copied from the existing dermatology practice, then upgraded."
        tone="warm"
      >
        <div className="info-grid">
          {contactCards.map((card) => (
            <article key={card.title} className="info-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Patient voice"
        title="Current patient trust carried into the new brand."
      >
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="story-card">
              <span className="story-card__meta">{testimonial.focus}</span>
              <h3>{testimonial.name}</h3>
              <p>{testimonial.quote}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Legacy imagery"
        title="Real clinic visuals from the previous site."
      >
        <div className="image-grid">
          {legacyGalleryImages.map((image) => (
            <div key={image.src} className="image-card">
              <Image
                src={image.src}
                alt={image.alt}
                width={700}
                height={520}
                className="image-card__image"
              />
            </div>
          ))}
        </div>
      </SectionShell>

      <CtaBand
        title="Your current dermatology business details are now part of the new brand structure."
        body="We can keep refining this with clinic images, awards, and doctor-specific media as soon as you share those assets."
        primaryCta={{ label: "Review contact page", href: "/contact" }}
      />
    </div>
  );
}
