import { createScaffoldAlgorithm } from "../helpers";
import { mergeSort, quickSort } from "../sorting";

export const divideConquerAlgorithms = [
  mergeSort,
  quickSort,
  createScaffoldAlgorithm({
    id: "binary-search",
    name: "Binary Search",
    description: "Cuts the search interval in half on each step.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    visualType: "tree",
  }),
];
