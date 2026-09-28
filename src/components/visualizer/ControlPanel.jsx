import { Pause, Play, Redo2, SkipForward, Sparkles } from "lucide-react";

const ControlPanel = ({
  customInput,
  inputSize,
  isPlaying,
  onCustomInputChange,
  onGenerateData,
  onReset,
  onStepForward,
  onTogglePlayPause,
  onInputSizeChange,
  onSpeedChange,
  speed,
  totalSteps,
  currentStepIndex,
}) => (
  <section className="visualizer-card">
    <div className="panel-heading">
      <div>
        <p className="panel-kicker">Control Panel</p>
        <h2>Run the algorithm your way</h2>
      </div>
      <span className="panel-badge">
        Step {Math.min(currentStepIndex + 1, totalSteps || 1)} /{" "}
        {Math.max(totalSteps, 1)}
      </span>
    </div>

    <div className="control-actions">
      <button className="action-btn primary" onClick={onGenerateData} type="button">
        <Sparkles size={16} />
        Generate Data
      </button>
      <button className="action-btn" onClick={onTogglePlayPause} type="button">
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        {isPlaying ? "Pause" : "Start"}
      </button>
      <button className="action-btn" onClick={onStepForward} type="button">
        <SkipForward size={16} />
        Step
      </button>
      <button className="action-btn" onClick={onReset} type="button">
        <Redo2 size={16} />
        Reset
      </button>
    </div>

    <label className="custom-input-card">
      <span>Custom Input</span>
      <textarea
        className="custom-input-field"
        rows="3"
        value={customInput}
        onChange={(event) => onCustomInputChange(event.target.value)}
        placeholder="Examples: 5,2,9,1,7 | N-Queens: 4 | Knapsack: 4,7"
      />
      <small>
        Leave blank for random data. For N-Queens enter board size. For Knapsack enter
        item count and capacity.
      </small>
    </label>

    <div className="slider-grid">
      <label className="slider-card">
        <span>Speed</span>
        <strong>{speed} ms</strong>
        <input
          type="range"
          min="80"
          max="1200"
          step="20"
          value={speed}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
        />
      </label>

      <label className="slider-card">
        <span>Input Size</span>
        <strong>{inputSize} items</strong>
        <input
          type="range"
          min="8"
          max="48"
          step="1"
          value={inputSize}
          onChange={(event) => onInputSizeChange(Number(event.target.value))}
        />
      </label>
    </div>
  </section>
);

export default ControlPanel;
