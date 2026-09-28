import { createScaffoldAlgorithm } from "../helpers";
import dijkstra from "../graph/dijkstra";

export const greedyAlgorithms = [
  dijkstra,
  createScaffoldAlgorithm({
    id: "kruskals",
    name: "Kruskal's",
    description: "Greedily picks the next cheapest valid edge.",
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(V)",
    visualType: "graph",
  }),
  createScaffoldAlgorithm({
    id: "huffman-coding",
    name: "Huffman Coding",
    description:
      "Builds a compact prefix tree using repeated greedy merges.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    visualType: "string",
  }),
];
