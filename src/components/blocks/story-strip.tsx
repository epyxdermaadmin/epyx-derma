type Story = {
  category: string;
  title: string;
  description: string;
};

export function StoryStrip({ stories }: { stories: Story[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {stories.map((story) => (
        <article key={story.title} className="surface-card rounded-3xl p-6">
          <span className="mb-3 inline-block text-[0.72rem] uppercase tracking-[0.16em] text-[var(--gold)]">
            {story.category}
          </span>
          <h3 className="font-display text-2xl text-[var(--text)]">{story.title}</h3>
          <p className="mt-3 leading-8 text-[var(--text-soft)]">{story.description}</p>
        </article>
      ))}
    </div>
  );
}
