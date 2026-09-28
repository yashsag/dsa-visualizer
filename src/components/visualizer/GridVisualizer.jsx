const buildGridFromArray = (values) => {
  const width = Math.max(4, Math.ceil(Math.sqrt(values.length)));
  const padded = [...values];

  while (padded.length < width * width) {
    padded.push("");
  }

  const rows = [];
  for (let index = 0; index < padded.length; index += width) {
    rows.push(padded.slice(index, index + width));
  }

  return rows;
};

const toCellKey = (cell) =>
  Array.isArray(cell) ? `${cell[0]}-${cell[1]}` : `${cell?.row}-${cell?.col}`;

const getBoardSize = (currentStep, data) => {
  const candidate =
    (Array.isArray(currentStep?.array) && currentStep.array.length === 1 && Number(currentStep.array[0])) ||
    (Array.isArray(data) && data.length === 1 && Number(data[0])) ||
    4;

  return Math.max(4, Math.min(10, Math.round(candidate)));
};

const buildNQueensBoard = (size, currentStep) => {
  const placedCells = new Set((currentStep?.placedCells || []).map(toCellKey));
  const removedCells = new Set((currentStep?.removedCells || []).map(toCellKey));
  const activeCell = currentStep?.activeCell ? toCellKey(currentStep.activeCell) : null;

  return Array.from({ length: size }, (_, rowIndex) =>
    Array.from({ length: size }, (_, colIndex) => {
      const key = `${rowIndex}-${colIndex}`;
      return {
        value: placedCells.has(key) ? 1 : 0,
        status:
          activeCell === key
            ? "active"
            : placedCells.has(key)
              ? "placed"
              : removedCells.has(key)
                ? "removed"
                : "",
      };
    }),
  );
};

const normalizeGrid = (algorithm, data, currentStep) => {
  if (algorithm?.id === "n-queens") {
    return buildNQueensBoard(getBoardSize(currentStep, data), currentStep);
  }

  const grid = currentStep?.grid || currentStep?.board || currentStep?.data || data;

  if (Array.isArray(grid) && Array.isArray(grid[0])) {
    return grid;
  }

  if (Array.isArray(grid)) {
    return buildGridFromArray(grid);
  }

  return [];
};

const getCellContent = (cell, compactMode) => {
  if (cell && typeof cell === "object" && !Array.isArray(cell)) {
    if (compactMode) {
      return cell.value ?? 0;
    }
    return cell.value ?? cell.label ?? cell.text ?? "";
  }

  return compactMode ? cell || 0 : cell ?? "";
};

const GridVisualizer = ({ accentColor, algorithm, currentStep, data, mode = "backtracking" }) => {
  const isNQueens = algorithm?.id === "n-queens";
  const grid = normalizeGrid(algorithm, data, currentStep);
  const width = Math.max(grid[0]?.length || 0, 1);
  const activeCell = currentStep?.activeCell
    ? toCellKey(currentStep.activeCell)
    : currentStep?.indices?.length
      ? toCellKey([
          Math.floor(currentStep.indices[0] / width),
          currentStep.indices[0] % width,
        ])
      : null;

  if (!grid.length) {
    return <div className="visualizer-empty">Grid and board states will render here for backtracking problems.</div>;
  }

  return (
    <div className="tracer-stage">
      <div className="tracer-hud">
        <div>
          <strong>{isNQueens ? "Board" : mode === "backtracking" ? "Decision Board" : "Grid State"}</strong>
          <span>{grid.length} x {grid[0].length}</span>
        </div>
        <div>
          <strong>Active Cell</strong>
          <span>{activeCell || "idle"}</span>
        </div>
      </div>
      <div className={`grid-frame ${isNQueens ? "grid-frame-compact" : ""}`.trim()}>
        <div
          className={`grid-axis grid-axis-top ${isNQueens ? "grid-axis-top-compact" : ""}`.trim()}
          style={{ gridTemplateColumns: `32px repeat(${grid[0].length}, minmax(32px, 44px))` }}
        >
          <span />
          {grid[0].map((_, colIndex) => (
            <span key={`col-${colIndex}`}>{colIndex}</span>
          ))}
        </div>
        <div
          className={`grid-stage ${isNQueens ? "grid-stage-compact" : ""}`.trim()}
          style={{ gridTemplateColumns: `${isNQueens ? "32px" : "48px"} repeat(${grid[0].length}, minmax(${isNQueens ? "32px" : "0"}, ${isNQueens ? "44px" : "1fr"}))` }}
        >
          {grid.flatMap((row, rowIndex) => [
            <span key={`row-${rowIndex}`} className="grid-axis-label">
              {rowIndex}
            </span>,
            ...row.map((cell, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              const explicitStatus =
                cell && typeof cell === "object" && !Array.isArray(cell) ? cell.status : "";
              const stateClass =
                explicitStatus || (activeCell === key ? "active" : "");

              return (
                <div
                  key={key}
                  className={`grid-cell ${isNQueens ? "grid-cell-compact" : ""} ${stateClass}`.trim()}
                  style={{ "--grid-accent": accentColor }}
                >
                  <span>{getCellContent(cell, isNQueens)}</span>
                  {!isNQueens && <small>{`(${rowIndex},${colIndex})`}</small>}
                </div>
              );
            }),
          ])}
        </div>
      </div>
    </div>
  );
};

export default GridVisualizer;
