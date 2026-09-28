import GraphVisualizer from "./GraphVisualizer";
import SortingVisualizer from "./SortingVisualizer";

const SearchVisualizer = (props) => {
  const { currentStep, data } = props;
  const hasGraphData =
    Boolean(currentStep?.graph) ||
    Boolean(currentStep?.data?.nodes) ||
    Boolean(data?.nodes) ||
    Boolean(currentStep?.activeNodes?.length);

  if (hasGraphData) {
    return <GraphVisualizer mode="search" {...props} />;
  }

  return <SortingVisualizer {...props} />;
};

export default SearchVisualizer;
