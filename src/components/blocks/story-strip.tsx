type Story = {
  category: string;
  title: string;
  description: string;
};

export function StoryStrip({ stories }: { stories: Story[] }) {
  return (
    <div className="story-strip">
      {stories.map((story) => (
        <article key={story.title} className="story-card">
          <span className="story-card__meta">{story.category}</span>
          <h3>{story.title}</h3>
          <p>{story.description}</p>
        </article>
      ))}
    </div>
  );
}
