import { createScaffoldAlgorithm } from "../helpers";
import dijkstra from "./dijkstra";

export const graphAlgorithms = [
  dijkstra,
  createScaffoldAlgorithm({
    id: "bellman-ford",
    name: "Bellman-Ford",
    description: "Relaxes all edges repeatedly to find shortest paths.",
    timeComplexity: "O(VE)",
    spaceComplexity: "O(V)",
    visualType: "graph",
  }),
  createScaffoldAlgorithm({
    id: "prim",
    name: "Prim",
    description: "Builds a minimum spanning tree one edge at a time.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    visualType: "graph",
  }),
];
