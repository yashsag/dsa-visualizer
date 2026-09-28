export const createStats = (overrides = {}) => ({
  comparisons: 0,
  swaps: 0,
  iterations: 0,
  ...overrides,
});

export const createStep = ({
  type,
  array,
  explanation,
  activeLines = [],
  indices = [],
  sortedIndices = [],
  pivotIndex = null,
  data = null,
  graph = null,
  grid = null,
  table = null,
  string = null,
  characters = null,
  tree = null,
  activeNodes = [],
  visitedNodes = [],
  activeEdges = [],
  visitedEdges = [],
  activeCell = null,
  placedCells = [],
  removedCells = [],
  stats = createStats(),
}) => ({
  type,
  array: [...array],
  explanation,
  // ponytail: algorithms often push into one shared array across many steps (e.g. sortedIndices
  // growing pass by pass) — snapshot every array-typed field here so each step freezes its own
  // state instead of every step retroactively showing the algorithm's *final* state.
  activeLines: [...activeLines],
  indices: [...indices],
  sortedIndices: [...sortedIndices],
  pivotIndex,
  data,
  graph,
  grid,
  table,
  string,
  characters: characters ? [...characters] : characters,
  tree,
  activeNodes: [...activeNodes],
  visitedNodes: [...visitedNodes],
  activeEdges: [...activeEdges],
  visitedEdges: [...visitedEdges],
  activeCell,
  placedCells: [...placedCells],
  removedCells: [...removedCells],
  stats: createStats(stats),
});

export const buildChainGraph = (input, maxNodes = 8) => {
  const values = input.slice(0, Math.min(input.length, maxNodes));
  const nodes = values.map((value, index) => ({
    id: index,
    label: String(value),
  }));

  const edges = [];
  for (let index = 0; index < nodes.length - 1; index += 1) {
    edges.push({
      id: `${index}-${index + 1}`,
      source: index,
      target: index + 1,
      weight: Math.abs(Number(values[index]) - Number(values[index + 1])) || 1,
    });
  }
  // ponytail: skip-edges give BFS/DFS real branching to traverse, upgrade to a random graph if a client needs it
  for (let index = 0; index < nodes.length - 2; index += 1) {
    edges.push({
      id: `${index}-${index + 2}`,
      source: index,
      target: index + 2,
      weight: Math.abs(Number(values[index]) - Number(values[index + 2])) || 2,
    });
  }

  const adjacency = new Map(nodes.map((node) => [node.id, []]));
  edges.forEach((edge) => {
    adjacency.get(edge.source).push({ to: edge.target, edgeId: edge.id, weight: edge.weight });
    adjacency.get(edge.target).push({ to: edge.source, edgeId: edge.id, weight: edge.weight });
  });
  adjacency.forEach((list) => list.sort((a, b) => a.to - b.to));

  return { nodes, edges, adjacency };
};

const buildGraphData = (input) => {
  const nodes = input.slice(0, Math.min(input.length, 8)).map((value, index) => ({
    id: index,
    label: String(value),
  }));

  const edges = nodes.slice(0, -1).map((node, index) => ({
    id: `${node.id}-${nodes[index + 1].id}`,
    source: node.id,
    target: nodes[index + 1].id,
    weight: Math.abs(Number(input[index]) - Number(input[index + 1])) || index + 1,
  }));

  return { nodes, edges };
};

const buildGridData = (input) => {
  const size = Math.max(4, Math.min(6, Math.ceil(Math.sqrt(input.length))));
  const cells = Array.from({ length: size * size }, (_, index) =>
    index < input.length ? input[index] : "",
  );

  const grid = [];
  for (let row = 0; row < size; row += 1) {
    grid.push(cells.slice(row * size, row * size + size));
  }

  return grid;
};

const buildTableData = (input) => {
  const cols = Math.max(3, Math.min(5, Math.ceil(Math.sqrt(input.length))));
  const rows = Math.max(2, Math.ceil(input.length / cols));
  const table = [];
  let pointer = 0;

  for (let row = 0; row < rows; row += 1) {
    const nextRow = [];
    for (let col = 0; col < cols; col += 1) {
      nextRow.push(input[pointer] ?? "");
      pointer += 1;
    }
    table.push(nextRow);
  }

  return table;
};

const buildStringData = (name, input) => {
  if (name === "KMP") {
    return "ABABCABAB";
  }

  if (name === "Rabin-Karp") {
    return "ALGOSEARCH";
  }

  if (name === "Huffman Coding") {
    return "visualizer";
  }

  return input.map((value) => String(value % 10)).join("");
};

const buildTreeData = (input) => {
  const makeNodes = (values, depth = 0, branch = "root") => {
    if (!values.length || depth > 2) {
      return [];
    }

    const mid = Math.floor(values.length / 2);
    const label = values.join(", ");
    const current = {
      id: `${branch}-${depth}-${label}`,
      label: `[${label}]`,
      detail: `Depth ${depth}`,
    };

    if (values.length <= 2) {
      return [current];
    }

    return [
      current,
      ...makeNodes(values.slice(0, mid), depth + 1, `${branch}-L`),
      ...makeNodes(values.slice(mid), depth + 1, `${branch}-R`),
    ];
  };

  return { nodes: makeNodes(input.slice(0, Math.min(input.length, 8))) };
};

const buildVisualPayload = (visualType, name, input) => {
  switch (visualType) {
    case "graph": {
      const graph = buildGraphData(input);
      return {
        data: graph,
        graph,
        activeNodes: graph.nodes.length ? [graph.nodes[0].id] : [],
        activeEdges: graph.edges.length ? [graph.edges[0].id] : [],
        visitedNodes: [],
        visitedEdges: [],
      };
    }
    case "grid": {
      const grid = buildGridData(input);
      return {
        data: grid,
        grid,
        activeCell: { row: 0, col: 0 },
        placedCells: [{ row: 0, col: 0 }],
        removedCells: [],
      };
    }
    case "table": {
      const table = buildTableData(input);
      return {
        data: table,
        table,
      };
    }
    case "string": {
      const value = buildStringData(name, input);
      return {
        data: value,
        string: value,
        characters: value.split(""),
      };
    }
    case "tree": {
      const tree = buildTreeData(input);
      return {
        data: tree,
        tree,
      };
    }
    default:
      return { data: input };
  }
};

export const createScaffoldAlgorithm = ({
  id,
  name,
  description,
  timeComplexity,
  spaceComplexity,
  visualType = "array",
}) => ({
  id,
  name,
  description,
  timeComplexity,
  spaceComplexity,
  codeLanguage: "Pseudo",
  code: [
    "1. Prepare the state space or input structure.",
    "2. Apply the category-specific strategy step by step.",
    "3. Update the visualization for each meaningful transition.",
    "4. Stop when the target condition is satisfied.",
  ],
  generateSteps(input) {
    const initialPayload = buildVisualPayload(visualType, name, input);
    const completionPayload = buildVisualPayload(visualType, name, [...input].reverse());

    return [
      createStep({
        type: "scaffold",
        array: input,
        explanation: `${name} scaffold loaded with sample ${visualType} data so the visualizer is visible immediately.`,
        activeLines: [1],
        ...initialPayload,
        stats: createStats(),
      }),
      createStep({
        type: "complete",
        array: input,
        explanation: `${name} scaffold complete. The current placeholder data confirms the visualization pipeline is working.`,
        activeLines: [4],
        ...completionPayload,
        visitedNodes: completionPayload.graph?.nodes?.map((node) => node.id) || [],
        visitedEdges: completionPayload.graph?.edges?.map((edge) => edge.id) || [],
        placedCells:
          completionPayload.grid?.flatMap((row, rowIndex) =>
            row.map((value, colIndex) =>
              value === "" ? null : { row: rowIndex, col: colIndex },
            ),
          ).filter(Boolean) || [],
        stats: createStats({ iterations: 1 }),
      }),
    ];
  },
});
