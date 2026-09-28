import { createScaffoldAlgorithm } from "../helpers";

export const randomizedAlgorithms = [
  createScaffoldAlgorithm({
    id: "kargers-algorithm",
    name: "Karger's Algorithm",
    description: "Randomly contracts edges to search for a minimum cut.",
    timeComplexity: "O(V^2 log V)",
    spaceComplexity: "O(V + E)",
    visualType: "graph",
  }),
];
