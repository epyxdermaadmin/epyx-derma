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

const accentStyles = {
  signature:
    "bg-[linear-gradient(135deg,#1f1814_0%,#342821_45%,#5c4438_100%)]",
  warm:
    "bg-[linear-gradient(135deg,#6e4c3a_0%,#b8856b_50%,#d2a28e_100%)]",
  dark:
    "bg-[linear-gradient(135deg,#1f1814_0%,#342821_45%,#5c4438_100%)]",
} as const;

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
    <section className="py-4 md:py-8">
      <div className="shell-container">
        <div className={`relative overflow-hidden rounded-[40px] p-6 text-[var(--text-inverse)] shadow-[var(--shadow)] md:p-8 ${accentStyles[accent]}`}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,232,216,0.18),transparent_18%),radial-gradient(circle_at_80%_15%,rgba(204,143,129,0.26),transparent_18%)]" />
          <div className="relative grid items-center gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
            <div className="grid gap-2">
              <span className="eyebrow eyebrow-on-dark">{eyebrow}</span>
              <h1 className="font-display max-w-[13ch] text-[clamp(2.1rem,5vw,4rem)] leading-none">
                {title}
              </h1>
              <p className="max-w-3xl pt-2 leading-8 text-[rgba(249,239,231,0.82)]">{body}</p>
              {chips.length ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex rounded-full border border-white/12 bg-white/10 px-3 py-2 text-xs text-[rgba(249,239,231,0.9)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={primaryCta.href} className="button-primary">{primaryCta.label}</Link>
                {secondaryCta ? <Link href={secondaryCta.href} className="button-secondary">{secondaryCta.label}</Link> : null}
              </div>
            </div>

            {imageSrc ? (
              <div className="relative min-h-[280px] overflow-hidden rounded-[24px] border border-white/12 bg-white/8">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="h-full w-full object-cover"
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
