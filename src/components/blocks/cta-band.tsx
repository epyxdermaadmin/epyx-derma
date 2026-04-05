import Link from "next/link";

type CtaBandProps = {
  title: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CtaBand({ title, body, primaryCta, secondaryCta }: CtaBandProps) {
  return (
    <section
      className="shell-container my-10 rounded-[36px] px-7 py-8 text-[var(--text-inverse)] shadow-[var(--shadow)] md:px-10"
      style={{ backgroundImage: "radial-gradient(circle at top left, rgba(204, 143, 129, 0.18), transparent 18%), linear-gradient(140deg, #211913, #3a2b23)" }}
    >
      <span className="eyebrow eyebrow-on-dark">Launch-ready frontend</span>
      <h2 className="font-display mt-3 text-[clamp(1.9rem,4vw,3rem)] leading-none">{title}</h2>
      <p className="mt-4 max-w-3xl leading-8 text-[rgba(249,239,231,0.82)]">{body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={primaryCta.href} className="button-primary">{primaryCta.label}</Link>
        {secondaryCta ? <Link href={secondaryCta.href} className="button-secondary">{secondaryCta.label}</Link> : null}
      </div>
    </section>
  );
}
