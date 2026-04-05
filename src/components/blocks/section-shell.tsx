type SectionShellProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "default" | "warm";
  children: React.ReactNode;
};

export function SectionShell({ eyebrow, title, intro, tone = "default", children }: SectionShellProps) {
  return (
    <section className="py-6 md:py-10">
      <div
        className={[
          "shell-container",
          tone === "warm"
            ? "rounded-[32px] border border-[rgba(74,51,38,0.08)] bg-[linear-gradient(180deg,rgba(255,248,242,0.8),rgba(244,234,225,0.72))] px-6 py-7 md:px-8"
            : "py-2",
        ].join(" ")}
      >
        <div className="mb-6 grid max-w-3xl gap-3">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-none text-[var(--text)]">{title}</h2>
          {intro ? <p className="leading-8 text-[var(--text-soft)]">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
