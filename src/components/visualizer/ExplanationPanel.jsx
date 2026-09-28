const ExplanationPanel = ({
  explanation,
  currentStepIndex,
  totalSteps,
}) => (
  <section className="visualizer-card">
    <div className="panel-heading">
      <div>
        <p className="panel-kicker">Live Explanation</p>
        <h2>What is happening now</h2>
      </div>
      <span className="panel-badge">
        {Math.min(currentStepIndex + 1, totalSteps || 1)} of{" "}
        {Math.max(totalSteps, 1)}
      </span>
    </div>
    <p className="explanation-copy">{explanation}</p>
  </section>
);

export default ExplanationPanel;
