import DPTableVisualizer from "./DPTableVisualizer";
import GraphVisualizer from "./GraphVisualizer";
import GridVisualizer from "./GridVisualizer";
import SearchVisualizer from "./SearchVisualizer";
import SortingVisualizer from "./SortingVisualizer";
import StringVisualizer from "./StringVisualizer";

const VisualizerCanvas = ({
  algorithm,
  array,
  currentStep,
  accentColor,
  algorithmName,
  category,
  data,
  steps = [],
}) => {
  const visualizerProps = {
    accentColor,
    algorithm,
    category,
    currentStep,
    data: data || array,
    steps,
  };

  const renderVisualizer = () => {
    switch (category) {
      case "divide-and-conquer":
        return <SortingVisualizer {...visualizerProps} />;
      case "dynamic-programming":
        return <DPTableVisualizer {...visualizerProps} />;
      case "greedy":
        return <GraphVisualizer mode="greedy" {...visualizerProps} />;
      case "backtracking":
        return <GridVisualizer mode="backtracking" {...visualizerProps} />;
      case "randomized":
        return <GraphVisualizer mode="randomized" {...visualizerProps} />;
      case "sorting":
        return <SortingVisualizer {...visualizerProps} />;
      case "searching":
        return <SearchVisualizer {...visualizerProps} />;
      case "graph":
        return <GraphVisualizer mode="graph" {...visualizerProps} />;
      case "string":
        return <StringVisualizer {...visualizerProps} />;
      default:
        return <div className="visualizer-empty">No Visualizer Available</div>;
    }
  };

  return (
    <section className="visualizer-card canvas-card">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">Visualization</p>
          <h2>{algorithmName}</h2>
        </div>
        <span
          className="panel-badge"
          style={{ borderColor: `${accentColor}55`, color: accentColor }}
        >
          {currentStep.type || "idle"}
        </span>
      </div>

      {renderVisualizer()}
    </section>
  );
};

export default VisualizerCanvas;
