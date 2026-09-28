const getStringPayload = (currentStep, data) => {
  if (typeof currentStep?.data === "object" && currentStep?.data !== null && !Array.isArray(currentStep.data)) {
    return currentStep.data;
  }

  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    return data;
  }

  const text =
    currentStep?.string ||
    (typeof data === "string"
      ? data
      : Array.isArray(data)
        ? data.map(String).join("")
        : "");

  return { text, pattern: "", offset: 0 };
};

const renderTrack = (label, value, activeIndices, mismatchIndex = -1) => (
  <div className="string-track">
    <span className="string-track-label">{label}</span>
    <div className="string-row">
      {value.split("").map((character, index) => {
        const stateClass = mismatchIndex === index ? "mismatch" : activeIndices.has(index) ? "match" : "";

        return (
          <div key={`${label}-${character}-${index}`} className={`string-cell ${stateClass}`.trim()}>
            <span>{character}</span>
            <small>{index}</small>
          </div>
        );
      })}
    </div>
  </div>
);

const StringVisualizer = ({ currentStep, data }) => {
  const payload = getStringPayload(currentStep, data);
  const text = payload.text || "";
  const pattern = payload.pattern || "";
  const activeIndices = new Set(currentStep?.indices || []);
  const mismatchIndex = currentStep?.type === "mismatch" ? currentStep?.indices?.[0] ?? -1 : -1;

  if (!text.length) {
    return <div className="visualizer-empty">String pattern-matching views will render here when character data is available.</div>;
  }

  return (
    <div className="tracer-stage">
      <div className="tracer-hud">
        <div>
          <strong>Source String</strong>
          <span>{text.length} chars</span>
        </div>
        <div>
          <strong>Pattern</strong>
          <span>{pattern || "n/a"}</span>
        </div>
      </div>
      <div className="string-stage">
        {renderTrack("Text", text, activeIndices, mismatchIndex)}
        {pattern && renderTrack("Pattern", pattern, activeIndices)}
      </div>
    </div>
  );
};

export default StringVisualizer;
