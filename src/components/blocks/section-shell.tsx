type SectionShellProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "default" | "warm";
  children: React.ReactNode;
};

export function SectionShell({
  eyebrow,
  title,
  intro,
  tone = "default",
  children,
}: SectionShellProps) {
  return (
    <section className="section-shell">
      <div
        className={`container section-shell__panel${
          tone === "warm" ? " section-shell__panel--warm" : ""
        }`}
      >
        <div className="section-shell__header">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h2>{title}</h2>
          {intro ? <p className="section-shell__intro">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
