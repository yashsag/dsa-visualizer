import { createScaffoldAlgorithm } from "../helpers";
import fibonacci from "./fibonacci";
import knapsack from "./knapsack";

export const dpAlgorithms = [
  fibonacci,
  knapsack,
  createScaffoldAlgorithm({
    id: "lcs",
    name: "LCS",
    description:
      "Finds the longest common subsequence using dynamic programming.",
    timeComplexity: "O(mn)",
    spaceComplexity: "O(mn)",
    visualType: "table",
  }),
];
