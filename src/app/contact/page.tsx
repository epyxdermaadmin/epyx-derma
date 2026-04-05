import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/blocks/cta-band";
import { PageHero } from "@/components/blocks/page-hero";
import { SectionShell } from "@/components/blocks/section-shell";
import { brand, doctorProfile } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Plan dermatology consultations and skin-care appointments with the EpyxDerma team in Madhurawada, Visakhapatnam.",
  path: "/contact",
});

const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
  "Hello, I would like to book a dermatology consultation."
)}`;

export default function ContactPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Contact and appointments"
        title="Reach the dermatology hospital with the real details from your current practice."
        body="The new site now carries over the existing Madhurawada, Visakhapatnam contact stack so appointments can start immediately while the brand presentation improves."
        primaryCta={{ label: "Open WhatsApp", href: whatsappHref }}
        secondaryCta={{ label: "Call hospital", href: brand.phoneLink }}
        accent="dark"
      />

      <SectionShell
        eyebrow="Appointment pathways"
        title="Simple contact routes with real business information."
      >
        <div className="contact-grid">
          <article className="contact-card contact-card--dark">
            <h3>Primary contact desk</h3>
            <div className="contact-card__details">
              <p>
                Dermatology enquiries can be routed directly to the existing clinic
                numbers while the new brand rolls out.
              </p>
            </div>
            <ul className="contact-list">
              <li>
                <strong>Doctor</strong>
                <span>{doctorProfile.name} - {doctorProfile.title}</span>
              </li>
              <li>
                <strong>Phone</strong>
                <a href={brand.phoneLink}>{brand.phoneDisplay}</a>
              </li>
              <li>
                <strong>Alternate phone</strong>
                <a href={brand.secondaryPhoneLink}>{brand.secondaryPhoneDisplay}</a>
              </li>
              <li>
                <strong>Email</strong>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </li>
              <li>
                <strong>Address</strong>
                <span>{brand.address}</span>
              </li>
              <li>
                <strong>Hours</strong>
                <span>{brand.hours}</span>
              </li>
            </ul>
            <div className="contact-card__actions">
              <Link href={whatsappHref} className="button-primary">
                Chat on WhatsApp
              </Link>
              <Link href={brand.phoneLink} className="button-secondary">
                Call now
              </Link>
            </div>
          </article>

          <article className="contact-card">
            <h3>Current launch status</h3>
            <p>
              The contact experience is now tied to your real existing business.
              Next, we can pull in richer testimonials, doctor qualifications, and
              treatment-specific conversion sections from your source materials.
            </p>
            <div className="badge-list">
              <span className="badge">Madhurawada, Visakhapatnam</span>
              <span className="badge">Mon - Sun availability</span>
              <span className="badge">Dermatology + cosmetology</span>
              <span className="badge">WhatsApp-ready route</span>
            </div>
          </article>
        </div>
      </SectionShell>

      <CtaBand
        title="The contact flow now points to the real dermatology business behind the new brand."
        body="When the next phase starts, leads, client tags, opt-ins, media-based campaigns, and WhatsApp delivery logs can connect to this public funnel."
        primaryCta={{ label: "Preview admin route", href: "/epyxdermaadmin" }}
      />
    </div>
  );
}
