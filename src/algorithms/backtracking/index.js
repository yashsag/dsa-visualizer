import { createScaffoldAlgorithm } from "../helpers";
import nQueens from "./nQueens";

export const backtrackingAlgorithms = [
  nQueens,
  createScaffoldAlgorithm({
    id: "sudoku-solver",
    name: "Sudoku Solver",
    description:
      "Tries candidate digits and backtracks when constraints fail.",
    timeComplexity: "Exponential",
    spaceComplexity: "O(81)",
    visualType: "grid",
  }),
];
