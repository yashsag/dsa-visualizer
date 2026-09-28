const buildTreeFromArray = (values, depth = 0, branch = "root", parentId = null, edges = []) => {
  if (!values.length || depth > 2) {
    return { nodes: [], edges };
  }

  const middle = Math.floor(values.length / 2);
  const label = values.join(", ");
  const currentNode = {
    id: `${branch}-${depth}-${label}`,
    label: `[${label}]`,
    detail: `Depth ${depth}`,
    depth,
    parentId,
  };

  if (parentId) {
    edges.push({ id: `${parentId}-${currentNode.id}`, source: parentId, target: currentNode.id });
  }

  if (values.length <= 2) {
    return { nodes: [currentNode], edges };
  }

  const leftTree = buildTreeFromArray(values.slice(0, middle), depth + 1, `${branch}-L`, currentNode.id, edges);
  const rightTree = buildTreeFromArray(values.slice(middle), depth + 1, `${branch}-R`, currentNode.id, edges);

  return {
    nodes: [currentNode, ...leftTree.nodes, ...rightTree.nodes],
    edges,
  };
};

const normalizeTree = (currentStep, data) => {
  if (currentStep?.tree?.nodes?.length) {
    return currentStep.tree;
  }

  if (currentStep?.nodes?.length) {
    return { nodes: currentStep.nodes, edges: [] };
  }

  if (Array.isArray(currentStep?.array)) {
    return buildTreeFromArray(currentStep.array);
  }

  if (Array.isArray(data)) {
    return buildTreeFromArray(data);
  }

  return { nodes: [], edges: [] };
};

const groupByDepth = (nodes) =>
  nodes.reduce((accumulator, node) => {
    const depth = node.depth ?? 0;
    accumulator[depth] = accumulator[depth] || [];
    accumulator[depth].push(node);
    return accumulator;
  }, {});

const RecursionTreeVisualizer = ({ currentStep, data }) => {
  const tree = normalizeTree(currentStep, data);
  const activeIds = new Set(currentStep?.activeNodes || []);
  const groups = groupByDepth(tree.nodes);
  const levels = Object.keys(groups)
    .map(Number)
    .sort((left, right) => left - right);

  if (!tree.nodes.length) {
    return <div className="visualizer-empty">Recursion trees will render here when hierarchical step data is provided.</div>;
  }

  return (
    <div className="tracer-stage">
      <div className="tracer-hud">
        <div>
          <strong>Recursive Calls</strong>
          <span>{tree.nodes.length} nodes</span>
        </div>
        <div>
          <strong>Mode</strong>
          <span>{currentStep?.type || "split"}</span>
        </div>
      </div>
      <div className="recursion-stage">
        {levels.map((level) => (
          <div key={`level-${level}`} className="recursion-level">
            <span className="recursion-level-label">{`Depth ${level}`}</span>
            <div className="recursion-level-row">
              {groups[level].map((node) => (
                <div
                  key={node.id}
                  className={`recursion-node ${activeIds.has(node.id) ? "active" : ""}`.trim()}
                >
                  <strong>{node.label || node.id}</strong>
                  <span>{node.detail || "Recursive call"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecursionTreeVisualizer;
