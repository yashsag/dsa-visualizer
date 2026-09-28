import nQueens from "../backtracking/nQueens";

const isValidSolution = (placedCells, size) => {
  if (placedCells.length !== size) return false;
  for (let a = 0; a < placedCells.length; a += 1) {
    for (let b = a + 1; b < placedCells.length; b += 1) {
      const rowDiff = Math.abs(placedCells[a].row - placedCells[b].row);
      const colDiff = Math.abs(placedCells[a].col - placedCells[b].col);
      if (placedCells[a].col === placedCells[b].col || rowDiff === colDiff) {
        return false;
      }
    }
  }
  return true;
};

describe("n-queens", () => {
  test("finds a valid solution for default and custom sizes", () => {
    [[], [4], [8], [Array.from({ length: 24 }, () => 1)].flat()].forEach((input) => {
      const steps = nQueens.generateSteps(input);
      const solutionStep = steps.find((s) => s.type === "solution");
      expect(solutionStep).toBeDefined();
      const size = solutionStep.array[0];
      expect(isValidSolution(solutionStep.placedCells, size)).toBe(true);
    });
  });
});
