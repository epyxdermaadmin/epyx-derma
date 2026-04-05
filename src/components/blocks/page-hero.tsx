import Image from "next/image";
import Link from "next/link";

type Cta = {
  label: string;
  href: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  accent?: "signature" | "warm" | "dark";
  imageSrc?: string;
  imageAlt?: string;
  chips?: string[];
};

export function PageHero({
  eyebrow,
  title,
  body,
  primaryCta,
  secondaryCta,
  accent = "dark",
  imageSrc,
  imageAlt,
  chips = [],
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className={`page-hero__panel page-hero__panel--${accent}`}>
          <div className="page-hero__grid">
            <div className="page-hero__content">
              <span className="eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              <p>{body}</p>
              {chips.length ? (
                <div className="hero-chip-row">
                  {chips.map((chip) => (
                    <span key={chip} className="hero-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="hero-actions">
                <Link href={primaryCta.href} className="button-primary">
                  {primaryCta.label}
                </Link>
                {secondaryCta ? (
                  <Link href={secondaryCta.href} className="button-secondary">
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </div>

            {imageSrc ? (
              <div className="hero-media">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  sizes="(max-width: 980px) 100vw, 38vw"
                  className="hero-media__image"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
