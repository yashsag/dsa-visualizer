import { buildChainGraph, createStats, createStep } from "../helpers";

const dfs = {
  id: "dfs",
  name: "DFS",
  description: "Explores as deep as possible before backtracking.",
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V)",
  codeLanguage: "Pseudo",
  code: [
    "1. Push the start node onto the stack.",
    "2. Pop the top node and visit it if unvisited.",
    "3. Push every unvisited neighbor onto the stack.",
    "4. Repeat until the stack is empty.",
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

    const visited = new Set();
    const visitedEdges = [];
    const stack = [{ node: 0, viaEdge: null }];

    steps.push(
      createStep({
        type: "initialize",
        array: input,
        explanation: `Start DFS at node ${nodes[0].label}.`,
        activeLines: [1],
        graph: { nodes, edges },
        activeNodes: [0],
        visitedNodes: [],
        stats,
      }),
    );

    while (stack.length) {
      const { node: current, viaEdge } = stack.pop();
      stats.iterations += 1;

      if (visited.has(current)) {
        continue;
      }

      visited.add(current);
      if (viaEdge) {
        visitedEdges.push(viaEdge);
      }

      steps.push(
        createStep({
          type: "visit",
          array: input,
          explanation: `Visit node ${nodes[current].label}.`,
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
          stack.push({ node: to, viaEdge: edgeId });

          steps.push(
            createStep({
              type: "discover",
              array: input,
              explanation: `Push node ${nodes[to].label} onto the stack.`,
              activeLines: [3],
              graph: { nodes, edges },
              activeNodes: [current, to],
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
        explanation: "DFS finished. Every reachable node has been visited.",
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

export default dfs;
