import Link from "next/link";

type CtaBandProps = {
  title: string;
  body: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export function CtaBand({
  title,
  body,
  primaryCta,
  secondaryCta,
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <span className="eyebrow">Launch-ready frontend</span>
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="cta-band__actions">
        <Link href={primaryCta.href} className="button-primary">
          {primaryCta.label}
        </Link>
        {secondaryCta ? (
          <Link href={secondaryCta.href} className="button-secondary">
            {secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
