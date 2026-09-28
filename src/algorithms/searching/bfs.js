import { buildChainGraph, createStats, createStep } from "../helpers";

const bfs = {
  id: "bfs",
  name: "BFS",
  description: "Explores nodes layer by layer using a queue.",
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V)",
  codeLanguage: "Pseudo",
  code: [
    "1. Enqueue the start node and mark it visited.",
    "2. Dequeue the next node from the front of the queue.",
    "3. Enqueue every unvisited neighbor.",
    "4. Repeat until the queue is empty.",
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

    const visited = new Set([0]);
    const visitedEdges = [];
    const queue = [0];

    steps.push(
      createStep({
        type: "initialize",
        array: input,
        explanation: `Start BFS at node ${nodes[0].label}.`,
        activeLines: [1],
        graph: { nodes, edges },
        activeNodes: [0],
        visitedNodes: [...visited],
        stats,
      }),
    );

    while (queue.length) {
      const current = queue.shift();
      stats.iterations += 1;

      steps.push(
        createStep({
          type: "visit",
          array: input,
          explanation: `Dequeue node ${nodes[current].label}.`,
          activeLines: [2],
          graph: { nodes, edges },
          activeNodes: [current],
          visitedNodes: [...visited],
          visitedEdges: [...visitedEdges],
          stats,
        }),
      );

      for (const { to, edgeId } of adjacency.get(current)) {
        stats.comparisons += 1;
        if (!visited.has(to)) {
          visited.add(to);
          visitedEdges.push(edgeId);
          queue.push(to);

          steps.push(
            createStep({
              type: "enqueue",
              array: input,
              explanation: `Discover node ${nodes[to].label} and enqueue it.`,
              activeLines: [3],
              graph: { nodes, edges },
              activeNodes: [to],
              visitedNodes: [...visited],
              activeEdges: [edgeId],
              visitedEdges: [...visitedEdges],
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
        explanation: "BFS finished. Every reachable node has been visited.",
        activeLines: [4],
        graph: { nodes, edges },
        visitedNodes: [...visited],
        visitedEdges: [...visitedEdges],
        stats,
      }),
    );

    return steps;
  },
};

export default bfs;
