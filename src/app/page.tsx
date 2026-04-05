import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/blocks/parallax";
import { Reveal } from "@/components/blocks/reveal";
import {
  adminModules,
  brand,
  contactCards,
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
    <div className="single-page-flow">
      <section id="story" className="story-hero section-anchor">
        <div className="container story-hero__panel">
          <div className="story-hero__bg story-hero__bg--one float-soft" />
          <div className="story-hero__bg story-hero__bg--two float-soft-delayed" />
          <div className="story-hero__grid">
            <Reveal className="story-hero__copy">
              <span className="eyebrow">Dermatology hospital, reimagined</span>
              <h1>One skin-first story, designed to feel alive as people scroll.</h1>
              <p>
                {brand.name} gives your dermatology practice its own identity instead of
                repeating the same message across separate pages. The whole public experience now
                moves like a guided consultation, from trust and doctor credibility to care scope,
                proof, imagery, and contact.
              </p>
              <div className="hero-chip-row">
                <span className="hero-chip">Clinical dermatology</span>
                <span className="hero-chip">Cosmetology</span>
                <span className="hero-chip">Hair clinic</span>
              </div>
              <div className="hero-actions">
                <Link href="/#contact" className="button-primary">
                  Book consultation
                </Link>
                <Link href="/#care-map" className="button-secondary">
                  Explore care map
                </Link>
              </div>
            </Reveal>

            <Reveal className="story-hero__visual" delayMs={120}>
              <Parallax strength={22}>
                <div className="hero-media hero-media--stacked hero-media--framed">
                  <Image
                    src={legacyGalleryImages[0].src}
                    alt={legacyGalleryImages[0].alt}
                    fill
                    sizes="(max-width: 980px) 100vw, 42vw"
                    className="hero-media__image"
                    priority
                  />
                </div>
              </Parallax>
              <Parallax strength={10}>
                <div className="story-hero__note">
                  <strong>{brand.city}</strong>
                  <span>Real clinic visuals and doctor details carried into the new brand.</span>
                </div>
              </Parallax>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="doctor" className="section-shell section-anchor">
        <div className="container section-shell__panel">
          <div className="section-shell__header">
            <span className="eyebrow">Doctor-led trust</span>
            <h2>The brand now opens with the person patients actually come to see.</h2>
            <p className="section-shell__intro">
              Instead of splitting attention across multiple pages, the doctor story sits early in
              the journey and anchors the site in real credentials, real experience, and a calmer
              consultation-led tone.
            </p>
          </div>
          <div className="portrait-layout">
            <Reveal>
              <Parallax strength={16}>
                <div className="portrait-card portrait-card--framed">
                  <Image
                    src={doctorProfile.image}
                    alt={doctorProfile.name}
                    width={520}
                    height={620}
                    className="portrait-card__image"
                  />
                </div>
              </Parallax>
            </Reveal>
            <Reveal delayMs={100}>
              <article className="info-card info-card--layered">
                <span className="story-card__meta">Lead dermatologist</span>
                <h3>{doctorProfile.name}</h3>
                <p>{doctorProfile.summary}</p>
                <p>
                  The clinical scope from the previous site remains intact, but now it is framed
                  within a stronger skin-only identity rather than being mixed with ophthalmology.
                </p>
                <div className="badge-list">
                  <span className="badge">MBBS - Andhra Medical College</span>
                  <span className="badge">MD, DDVL - NRI Medical College</span>
                  <span className="badge">10+ years experience</span>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="care-map" className="section-shell section-anchor">
        <div className="container section-shell__panel section-shell__panel--warm">
          <div className="section-shell__header">
            <span className="eyebrow">Care map</span>
            <h2>Each section now earns its place with a distinct purpose.</h2>
            <p className="section-shell__intro">
              We trimmed repeated copy and turned the service story into three clear decision
              lanes so visitors understand where they fit immediately.
            </p>
          </div>
          <div className="treatment-grid">
            {spotlightPrograms.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 80}>
                <article className="treatment-card treatment-card--tall">
                  <span className="treatment-card__meta">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="feature-grid care-signals">
            {homeHighlights.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 90}>
                <article className="feature-card">
                  <span className="feature-index">{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="section-shell section-anchor">
        <div className="container section-shell__panel">
          <div className="section-shell__header">
            <span className="eyebrow">Proof and outcomes</span>
            <h2>Trust arrives through patient voice, visible care journeys, and hard signals.</h2>
            <p className="section-shell__intro">
              This section does the work of several old pages at once: social proof, service
              confidence, and operational maturity, all without repeating the same headline.
            </p>
          </div>
          <div className="story-strip">
            {patientJourneys.map((story, index) => (
              <Reveal key={story.title} delayMs={index * 100}>
                <article className="story-card story-card--tall">
                  <span className="story-card__meta">{story.category}</span>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delayMs={index * 120}>
                <article className="story-card">
                  <span className="story-card__meta">{testimonial.focus}</span>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.quote}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="metrics-grid">
            {homeMetrics.map((metric, index) => (
              <Reveal key={metric.label} delayMs={index * 70}>
                <div className="metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section-shell section-anchor">
        <div className="container section-shell__panel">
          <div className="section-shell__header">
            <span className="eyebrow">Atmosphere</span>
            <h2>Real clinic imagery now lives inside the story instead of hiding on separate pages.</h2>
            <p className="section-shell__intro">
              This makes the site feel more grounded and more animated at the same time, because
              the visuals enter naturally as the visitor moves through the experience.
            </p>
          </div>
          <div className="image-grid image-grid--masonry">
            {legacyGalleryImages.map((image, index) => (
              <Reveal key={image.src} delayMs={index * 100}>
                <Parallax strength={12 + index * 3}>
                  <div className="image-card image-card--lift">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={700}
                      height={520}
                      className="image-card__image"
                    />
                  </div>
                </Parallax>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell section-anchor">
        <div className="container section-shell__panel section-shell__panel--warm">
          <div className="section-shell__header">
            <span className="eyebrow">Contact and continuity</span>
            <h2>The page closes with real clinic details and the next operational layer.</h2>
            <p className="section-shell__intro">
              Patients get the appointment path they need, and your team still keeps access to the
              admin workflow for future WhatsApp outreach and media-led updates.
            </p>
          </div>
          <div className="contact-grid">
            <Reveal>
              <article className="contact-card contact-card--dark">
                <h3>Visit or call {brand.name}</h3>
                <div className="contact-card__details">
                  <p>{brand.address}</p>
                  <p>{brand.hours}</p>
                  <p>
                    <a href={brand.phoneLink}>{brand.phoneDisplay}</a>
                    {" / "}
                    <a href={brand.secondaryPhoneLink}>{brand.secondaryPhoneDisplay}</a>
                  </p>
                  <p>
                    <a href={`mailto:${brand.email}`}>{brand.email}</a>
                  </p>
                </div>
                <div className="contact-card__actions">
                  <a href={brand.phoneLink} className="button-primary">
                    Call now
                  </a>
                  <a
                    href={`https://wa.me/${brand.whatsappNumber}`}
                    className="button-secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
            <Reveal delayMs={120}>
              <div className="info-grid info-grid--stack">
                {contactCards.map((card) => (
                  <article key={card.title} className="info-card">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="dual-panel">
            <Reveal>
              <article className="spotlight-panel">
                <h3>Frequently asked</h3>
                <div className="mini-list">
                  {faqItems.map((item) => (
                    <div key={item.question} className="mini-list__item">
                      <strong>{item.question}</strong>
                      <span>{item.answer}</span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
            <Reveal delayMs={120}>
              <article className="spotlight-panel spotlight-panel--dark">
                <h3>Admin continuity</h3>
                <div className="mini-list">
                  {adminModules.slice(0, 3).map((item) => (
                    <div key={item.title} className="mini-list__item">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </div>
                  ))}
                </div>
                <Link href="/epyxdermaadmin" className="text-link text-link--light">
                  Open admin workspace
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
