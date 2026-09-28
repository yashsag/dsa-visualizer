import { motion } from "framer-motion";

const getNodeId = (node, index) => node?.id ?? node?.key ?? node?.label ?? index;

const getNodePosition = (node, index, total) => {
  if (typeof node?.x === "number" && typeof node?.y === "number") {
    return { x: node.x, y: node.y };
  }

  const angle = (Math.PI * 2 * index) / Math.max(total, 1);
  return {
    x: 50 + Math.cos(angle - Math.PI / 2) * 34,
    y: 50 + Math.sin(angle - Math.PI / 2) * 34,
  };
};

const buildGraphFromArray = (values) => {
  const nodes = values.map((value, index) => ({
    id: index,
    label: String(value),
  }));

  const edges = values.slice(0, -1).map((_, index) => ({
    id: `${index}-${index + 1}`,
    source: index,
    target: index + 1,
    weight: Math.abs(values[index] - values[index + 1]),
  }));

  return { nodes, edges };
};

const normalizeGraph = (data, currentStep) => {
  const graph =
    currentStep?.graph ||
    currentStep?.data?.graph ||
    data?.graph ||
    currentStep?.data ||
    data ||
    {};

  if (Array.isArray(graph)) {
    return buildGraphFromArray(graph);
  }

  return {
    nodes: Array.isArray(graph.nodes) ? graph.nodes : [],
    edges: Array.isArray(graph.edges) ? graph.edges : [],
  };
};

const makeEdgeKey = (edge) =>
  edge?.id ?? `${edge?.source ?? edge?.from}-${edge?.target ?? edge?.to}`;

const GraphVisualizer = ({ accentColor, currentStep, data }) => {
  const metadata = currentStep?.data && !Array.isArray(currentStep.data) ? currentStep.data : {};
  const { nodes, edges } = normalizeGraph(data, currentStep);
  const activeNodes = new Set(currentStep?.activeNodes || currentStep?.indices || []);
  const visitedNodes = new Set(
    currentStep?.visitedNodes ||
      currentStep?.sortedIndices ||
      (currentStep?.type === "complete" ? nodes.map((node, index) => node.id ?? index) : []),
  );
  const activeEdges = new Set((currentStep?.activeEdges || []).map(String));
  const visitedEdges = new Set((currentStep?.visitedEdges || []).map(String));

  if (!nodes.length) {
    return <div className="visualizer-empty">Graph data will render here when node and edge steps are provided.</div>;
  }

  const positionedNodes = nodes.map((node, index) => ({
    ...node,
    nodeId: getNodeId(node, index),
    ...getNodePosition(node, index, nodes.length),
  }));
  const nodeMap = new Map(positionedNodes.map((node) => [String(node.nodeId), node]));

  return (
    <div className="tracer-stage">
      <div className="tracer-hud">
        <div>
          <strong>{metadata.title || "Network State"}</strong>
          <span>{metadata.subtitle || `${nodes.length} nodes / ${edges.length} edges`}</span>
        </div>
        <div>
          <strong>Frontier</strong>
          <span>{currentStep?.activeNodes?.length || activeNodes.size || 0} active</span>
        </div>
      </div>
      <div className="graph-stage">
        <svg viewBox="0 0 100 100" className="graph-svg" role="img" aria-label="Graph visualization">
          {edges.map((edge) => {
            const sourceId = String(edge?.source ?? edge?.from);
            const targetId = String(edge?.target ?? edge?.to);
            const source = nodeMap.get(sourceId);
            const target = nodeMap.get(targetId);

            if (!source || !target) {
              return null;
            }

            const edgeKey = String(makeEdgeKey(edge));
            const isActive = activeEdges.has(edgeKey);
            const isVisited = visitedEdges.has(edgeKey);
            const labelX = (source.x + target.x) / 2;
            const labelY = (source.y + target.y) / 2;

            return (
              <g key={edgeKey}>
                <line
                  className={`graph-edge-line ${isActive ? "active" : ""} ${isVisited ? "visited" : ""}`.trim()}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  style={{ "--graph-accent": accentColor }}
                />
                {edge?.weight !== undefined && (
                  <text x={labelX} y={labelY} className="graph-edge-weight">
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}

          {positionedNodes.map((node) => {
            const isActive = activeNodes.has(node.nodeId) || activeNodes.has(String(node.nodeId));
            const isVisited = visitedNodes.has(node.nodeId) || visitedNodes.has(String(node.nodeId));

            return (
              <g
                key={node.nodeId}
                className={`graph-node ${isActive ? "active" : ""} ${isVisited ? "visited" : ""}`.trim()}
              >
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="6"
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  style={{ "--graph-accent": accentColor }}
                />
                <text x={node.x} y={node.y - 9} className="graph-node-name">
                  {node.label ?? node.nodeId}
                </text>
                <text x={node.x} y={node.y + 1.5} className="graph-node-label">
                  {node.value ?? node.nodeId}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default GraphVisualizer;
