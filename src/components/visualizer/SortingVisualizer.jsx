const BAR_LEGEND = [
  { className: "active", label: "Comparing" },
  { className: "swap", label: "Swapping / Moving" },
  { className: "pivot", label: "Pivot / Found" },
  { className: "sorted", label: "Sorted" },
];

const getBarStateClass = (index, currentStep) => {
  if (currentStep?.sortedIndices?.includes(index)) {
    return "sorted";
  }

  if (currentStep?.pivotIndex === index) {
    return "pivot";
  }

  if (currentStep?.indices?.includes(index)) {
    // ponytail: step.type names match createStep call sites across every sorting/search algorithm
    const movingTypes = ["swap", "overwrite", "insert", "shift"];
    return movingTypes.includes(currentStep?.type) ? "swap" : "active";
  }

  return "";
};

const SortingVisualizer = ({ accentColor, currentStep, data }) => {
  const fallbackValues = Array.isArray(data)
    ? data
    : Array.isArray(data?.values)
      ? data.values
      : [];
  const values = Array.isArray(currentStep?.array) ? currentStep.array : fallbackValues;
  const maxValue = Math.max(...values, 1);
  const scaleMarkers = [0, 25, 50, 75, 100];
  const targetValue = currentStep?.data?.target;

  if (!values.length) {
    return <div className="visualizer-empty">No sorting data available.</div>;
  }

  return (
    <div className="tracer-stage">
      <div className="tracer-hud">
        <div>
          <strong>Array State</strong>
          <span>{values.length} samples</span>
        </div>
        {targetValue !== undefined && targetValue !== null && (
          <div>
            <strong>Target</strong>
            <span>{targetValue}</span>
          </div>
        )}
      </div>
      <div className="bar-legend">
        {BAR_LEGEND.map(({ className, label }) => (
          <span key={className} className="bar-legend-item">
            <span className={`bar-legend-swatch ${className}`} style={{ "--bar-accent": accentColor }} />
            {label}
          </span>
        ))}
      </div>
      <div className="canvas-stage">
        <div className="chart-axis chart-axis-y">
          {scaleMarkers
            .slice()
            .reverse()
            .map((marker) => (
              <span key={marker}>{Math.round((marker / 100) * maxValue)}</span>
            ))}
        </div>
        <div className="chart-plot">
          {values.map((value, index) => {
            // ponytail: cap at 60% so the tallest bar doesn't fill the whole chart height
            const height = `${Math.max((Number(value) / maxValue) * 60, 6)}%`;

            return (
              <div key={`${index}-${value}`} className="canvas-column">
                <div
                  className={`canvas-bar ${getBarStateClass(index, currentStep)}`.trim()}
                  style={{ "--bar-accent": accentColor, height }}
                >
                  <span className="canvas-bar-value">{value}</span>
                </div>
                <span className="canvas-bar-index">{index}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
