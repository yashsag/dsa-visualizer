const buildTableFromArray = (values) => {
  const rows = Math.max(2, Math.ceil(Math.sqrt(values.length)));
  const cols = Math.max(2, Math.ceil(values.length / rows));
  const table = [];
  let cursor = 0;

  for (let row = 0; row < rows; row += 1) {
    const nextRow = [];
    for (let col = 0; col < cols; col += 1) {
      nextRow.push(values[cursor] ?? "");
      cursor += 1;
    }
    table.push(nextRow);
  }

  return table;
};

const buildKnapsackTable = (currentStep, data) => {
  if (Array.isArray(currentStep?.table) && Array.isArray(currentStep.table[0])) {
    return currentStep.table;
  }

  const source = Array.isArray(currentStep?.array) && currentStep.array.length
    ? currentStep.array
    : Array.isArray(data)
      ? data
      : [4, 7];

  const itemCount = Math.max(1, Math.round(Number(source[0]) || 4));
  const capacity = Math.max(1, Math.round(Number(source[1]) || 7));

  return Array.from({ length: itemCount + 1 }, () => Array.from({ length: capacity + 1 }, () => 0));
};

const normalizeTable = (algorithm, currentStep, data) => {
  if (algorithm?.id === "knapsack-01") {
    return buildKnapsackTable(currentStep, data);
  }

  const raw = currentStep?.table || currentStep?.data || data;

  if (Array.isArray(raw) && Array.isArray(raw[0])) {
    return raw;
  }

  if (Array.isArray(raw)) {
    return buildTableFromArray(raw);
  }

  return null;
};

const DPTableVisualizer = ({ algorithm, currentStep, data, accentColor }) => {
  const isKnapsack = algorithm?.id === "knapsack-01";
  const table = normalizeTable(algorithm, currentStep, data);
  const activeSet = new Set(
    (currentStep?.indices || []).map((index) => {
      const width = table?.[0]?.length || 1;
      return `${Math.floor(index / width)}-${index % width}`;
    }),
  );

  if (!Array.isArray(table) || !Array.isArray(table[0])) {
    return <div className="visualizer-empty">DP tables will appear here when matrix-based step data is provided.</div>;
  }

  return (
    <div className="tracer-stage">
      <div className="tracer-hud">
        <div>
          <strong>{isKnapsack ? "Knapsack Table" : "Memo Table"}</strong>
          <span>{table.length} rows x {table[0].length} cols</span>
        </div>
        <div>
          <strong>Update Mode</strong>
          <span>{currentStep?.type || "idle"}</span>
        </div>
      </div>
      <div className={`dp-stage ${isKnapsack ? "dp-stage-compact" : ""}`.trim()}>
        <div
          className={`dp-header-row ${isKnapsack ? "dp-header-row-compact" : ""}`.trim()}
          style={{ gridTemplateColumns: `32px repeat(${table[0].length}, minmax(${isKnapsack ? "32px" : "72px"}, 1fr))` }}
        >
          <span className="dp-corner" />
          {table[0].map((_, colIndex) => (
            <span key={`header-${colIndex}`} className="dp-header-cell">
              {colIndex}
            </span>
          ))}
        </div>
        {table.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={`dp-row ${isKnapsack ? "dp-row-compact" : ""}`.trim()}
            style={{ gridTemplateColumns: `32px repeat(${row.length}, minmax(${isKnapsack ? "32px" : "72px"}, 1fr))` }}
          >
            <span className="dp-header-cell">{rowIndex}</span>
            {row.map((value, colIndex) => {
              const isActive = activeSet.has(`${rowIndex}-${colIndex}`);
              const isFilled = value !== "" && value !== null && value !== undefined;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`dp-cell ${isKnapsack ? "dp-cell-compact" : ""} ${isActive ? "active" : ""} ${isFilled ? "filled" : ""}`.trim()}
                  style={{ "--dp-accent": accentColor }}
                >
                  <strong>{value === "" ? "-" : value}</strong>
                  {!isKnapsack && <small>{`[${rowIndex},${colIndex}]`}</small>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DPTableVisualizer;
