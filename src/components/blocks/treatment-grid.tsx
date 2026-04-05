type TreatmentItem = {
  category: string;
  title: string;
  description: string;
};

export function TreatmentGrid({ items }: { items: TreatmentItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="surface-card rounded-3xl p-6">
          <span className="mb-3 inline-block text-[0.72rem] uppercase tracking-[0.16em] text-[var(--gold)]">
            {item.category}
          </span>
          <h3 className="font-display text-2xl text-[var(--text)]">{item.title}</h3>
          <p className="mt-3 leading-8 text-[var(--text-soft)]">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
