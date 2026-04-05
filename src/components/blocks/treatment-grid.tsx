type TreatmentItem = {
  category: string;
  title: string;
  description: string;
};

export function TreatmentGrid({ items }: { items: TreatmentItem[] }) {
  return (
    <div className="treatment-grid">
      {items.map((item) => (
        <article key={item.title} className="treatment-card">
          <span className="treatment-card__meta">{item.category}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}
