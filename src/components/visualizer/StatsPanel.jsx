const StatsPanel = ({ stats, timeComplexity, spaceComplexity }) => {
  const items = [
    { label: "Comparisons", value: stats.comparisons },
    { label: "Swaps", value: stats.swaps },
    { label: "Iterations", value: stats.iterations },
    { label: "Time Complexity", value: timeComplexity },
    { label: "Space Complexity", value: spaceComplexity },
  ];

  return (
    <section className="visualizer-card">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">Stats Panel</p>
          <h2>Performance snapshot</h2>
        </div>
      </div>

      <div className="stats-grid">
        {items.map((item) => (
          <article key={item.label} className="stat-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
};

export default StatsPanel;
