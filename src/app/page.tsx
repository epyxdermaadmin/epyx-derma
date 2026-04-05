import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/blocks/cta-band";
import { PageHero } from "@/components/blocks/page-hero";
import { SectionShell } from "@/components/blocks/section-shell";
import { StoryStrip } from "@/components/blocks/story-strip";
import { TreatmentGrid } from "@/components/blocks/treatment-grid";
import {
  doctorProfile,
  faqItems,
  homeHighlights,
  homeMetrics,
  legacyGalleryImages,
  patientJourneys,
  spotlightPrograms,
  testimonials,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="Dermatology hospital, reimagined"
        title="A skin-first digital brand for the practice you already run."
        body="EpyxDerma transforms the dermatology side of your current hospital into a richer standalone experience while keeping the real doctor profile, service mix, and contact funnel from the live business."
        primaryCta={{ label: "Book consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore treatments", href: "/treatments" }}
        accent="signature"
        imageSrc={legacyGalleryImages[0].src}
        imageAlt={legacyGalleryImages[0].alt}
        chips={["Clinical dermatology", "Cosmetology", "Hair clinic"]}
      />

      <SectionShell
        eyebrow="Why patients choose us"
        title="Built from real dermatology care, not generic clinic copy."
        intro="The current practice already positions itself around exact diagnosis, personalized care, and patient education. The new brand now gives those strengths a stronger public-facing identity."
      >
        <div className="feature-grid">
          {homeHighlights.map((item) => (
            <article key={item.title} className="feature-card">
              <span className="feature-index">{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Doctor spotlight"
        title={doctorProfile.name}
        intro={doctorProfile.summary}
        tone="warm"
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
              The previous website described her work across skin, hair, nail, oral mucosa,
              cosmetology, and laser issue care. This site now gives that dermatology work its own dedicated brand space.
            </p>
            <div className="badge-list">
              <span className="badge">MBBS - Andhra Medical College</span>
              <span className="badge">MD, DDVL - NRI Medical College</span>
              <span className="badge">10+ years experience</span>
            </div>
          </article>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Clinic visuals"
        title="Images carried over from the existing dermatology presence."
        intro="The gallery below uses real photos from the previous site so the new experience feels connected to the actual practice rather than generic stock presentation."
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

      <SectionShell
        eyebrow="Programs in focus"
        title="The actual dermatology service stack, presented more clearly."
        intro="The public site now uses the skin-side services from your existing practice instead of starter placeholders."
        tone="warm"
      >
        <TreatmentGrid items={spotlightPrograms} />
      </SectionShell>

      <SectionShell
        eyebrow="Patient stories"
        title="Trust signals carried over from the live business."
        intro="Your current site includes patient appreciation for both skin and hair care. Those signals now sit inside a more premium and credible layout."
      >
        <StoryStrip stories={patientJourneys} />
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
        eyebrow="Numbers that build trust"
        title="Real business details, cleaner presentation."
      >
        <div className="metrics-grid">
          {homeMetrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Common questions"
        title="A starter FAQ layer for the new brand."
      >
        <div className="info-grid">
          {faqItems.map((item) => (
            <article key={item.question} className="info-card">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Operational continuity"
        title="The website already anticipates your next system layer."
        intro="The admin workspace now supports client records, media uploads, and campaign drafts so the WhatsApp integration phase can plug into a real workflow."
      >
        <div className="dual-panel">
          <article className="spotlight-panel">
            <h3>Admin dashboard</h3>
            <p>
              Sign in to add clients, capture opt-ins, upload photo or video content,
              and prepare segmented posts for the next delivery layer.
            </p>
            <Link href="/epyxdermaadmin" className="text-link">
              Open admin workspace
            </Link>
          </article>
          <article className="spotlight-panel spotlight-panel--dark">
            <h3>WhatsApp-ready campaign flow</h3>
            <p>
              Client tags, media assets, and campaign drafts are now part of the app,
              ready for outbound sending integration in the next step.
            </p>
            <Link href="/contact" className="text-link text-link--light">
              Start with appointment journey
            </Link>
          </article>
        </div>
      </SectionShell>

      <CtaBand
        title="The public site and the operational foundation are now moving together."
        body="Your dermatology brand now reflects the live business, while the admin route starts handling the data and content workflows needed for future client messaging."
        primaryCta={{ label: "Plan appointments", href: "/contact" }}
        secondaryCta={{ label: "Open admin route", href: "/epyxdermaadmin" }}
      />
    </>
  );
}
