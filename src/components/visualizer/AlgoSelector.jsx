const AlgoSelector = ({ algorithms, selectedAlgorithmId, onSelect }) => (
  <label className="visualizer-select-wrap">
    <span className="visualizer-select-label">Algorithm</span>
    <select
      className="visualizer-select"
      value={selectedAlgorithmId}
      onChange={(event) => onSelect(event.target.value)}
    >
      {algorithms.map((algorithm) => (
        <option key={algorithm.id} value={algorithm.id}>
          {algorithm.name}
        </option>
      ))}
    </select>
  </label>
);

export default AlgoSelector;
