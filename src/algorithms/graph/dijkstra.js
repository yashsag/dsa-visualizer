import { buildChainGraph, createStats, createStep } from "../helpers";

const dijkstra = {
  id: "dijkstra",
  name: "Dijkstra",
  description: "Expands the frontier using the shortest known distance.",
  timeComplexity: "O((V + E) log V)",
  spaceComplexity: "O(V)",
  codeLanguage: "Pseudo",
  code: [
    "1. Set distance to the start node as 0, all others as infinity.",
    "2. Pick the unvisited node with the smallest known distance.",
    "3. Relax every edge leaving that node.",
    "4. Repeat until every node is visited.",
  ],
  generateSteps(input) {
    const { nodes, edges, adjacency } = buildChainGraph(input);
    const steps = [];
    const stats = createStats();

    if (!nodes.length) {
      steps.push(
        createStep({
          type: "complete",
          array: input,
          explanation: "No nodes to traverse.",
          graph: { nodes, edges },
          stats,
        }),
      );
      return steps;
    }

    const distances = new Map(nodes.map((node) => [node.id, Infinity]));
    distances.set(0, 0);
    const visited = new Set();
    const visitedEdges = [];

    const distanceSummary = () =>
      nodes
        .map((node) => `${node.label}: ${distances.get(node.id) === Infinity ? "inf" : distances.get(node.id)}`)
        .join(", ");

    steps.push(
      createStep({
        type: "initialize",
        array: input,
        explanation: `Start Dijkstra at node ${nodes[0].label} with distance 0.`,
        activeLines: [1],
        graph: { nodes, edges },
        activeNodes: [0],
        data: { title: "Distances", subtitle: distanceSummary() },
        stats,
      }),
    );

    while (visited.size < nodes.length) {
      let current = null;
      let currentDistance = Infinity;
      for (const node of nodes) {
        if (!visited.has(node.id) && distances.get(node.id) < currentDistance) {
          current = node.id;
          currentDistance = distances.get(node.id);
        }
      }

      if (current === null) {
        break;
      }

      visited.add(current);
      stats.iterations += 1;

      steps.push(
        createStep({
          type: "visit",
          array: input,
          explanation: `Visit node ${nodes[current].label} with shortest known distance ${currentDistance}.`,
          activeLines: [2],
          graph: { nodes, edges },
          activeNodes: [current],
          visitedNodes: [...visited],
          visitedEdges: [...visitedEdges],
          data: { title: "Distances", subtitle: distanceSummary() },
          stats,
        }),
      );

      for (const { to, edgeId, weight } of adjacency.get(current)) {
        stats.comparisons += 1;
        if (visited.has(to)) {
          continue;
        }

        const candidate = distances.get(current) + weight;
        if (candidate < distances.get(to)) {
          distances.set(to, candidate);
          visitedEdges.push(edgeId);

          steps.push(
            createStep({
              type: "relax",
              array: input,
              explanation: `Relax edge to ${nodes[to].label}: new distance ${candidate}.`,
              activeLines: [3],
              graph: { nodes, edges },
              activeNodes: [current, to],
              visitedNodes: [...visited],
              activeEdges: [edgeId],
              visitedEdges: [...visitedEdges],
              data: { title: "Distances", subtitle: distanceSummary() },
              stats,
            }),
          );
        }
      }
    }

    steps.push(
      createStep({
        type: "complete",
        array: input,
        explanation: "Dijkstra finished. Shortest distances found for every reachable node.",
        activeLines: [4],
        graph: { nodes, edges },
        visitedNodes: [...visited],
        visitedEdges: [...visitedEdges],
        data: { title: "Distances", subtitle: distanceSummary() },
        stats,
      }),
    );

    return steps;
  },
};

export default dijkstra;
