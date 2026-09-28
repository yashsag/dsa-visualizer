import { createStats, createStep } from "../helpers";

const clampSize = (value) => Math.max(4, Math.min(10, Math.round(value)));

const nQueens = {
  id: "n-queens",
  name: "N-Queens",
  description:
    "Places queens row by row while undoing invalid choices.",
  timeComplexity: "O(n!)",
  spaceComplexity: "O(n)",
  codeLanguage: "Pseudo",
  code: [
    "1. Try placing a queen in the next row.",
    "2. Check the column and both diagonals for conflicts.",
    "3. If safe, place the queen and move to the next row.",
    "4. If no column works, backtrack to the previous row.",
  ],
  generateSteps(input) {
    const size = clampSize(input.length === 1 ? input[0] : 8);
    const steps = [];
    const stats = createStats();
    const queens = [];

    const isSafe = (row, col) =>
      queens.every(
        (placedCol, placedRow) =>
          placedCol !== col && Math.abs(placedCol - col) !== Math.abs(placedRow - row),
      );

    const placedCells = () => queens.map((col, row) => ({ row, col }));

    steps.push(
      createStep({
        type: "initialize",
        array: [size],
        explanation: `Solve the ${size}-Queens problem one row at a time.`,
        activeLines: [1],
        placedCells: [],
        stats,
      }),
    );

    const backtrack = (row) => {
      if (row === size) {
        steps.push(
          createStep({
            type: "solution",
            array: [size],
            explanation: `All ${size} queens placed without conflicts.`,
            activeLines: [3],
            placedCells: placedCells(),
            stats,
          }),
        );
        return true;
      }

      for (let col = 0; col < size; col += 1) {
        stats.comparisons += 1;
        stats.iterations += 1;

        steps.push(
          createStep({
            type: "attempt",
            array: [size],
            explanation: `Try row ${row}, column ${col}.`,
            activeLines: [1, 2],
            activeCell: { row, col },
            placedCells: placedCells(),
            stats,
          }),
        );

        if (isSafe(row, col)) {
          queens.push(col);
          steps.push(
            createStep({
              type: "place",
              array: [size],
              explanation: `Place a queen at row ${row}, column ${col}.`,
              activeLines: [3],
              activeCell: { row, col },
              placedCells: placedCells(),
              stats,
            }),
          );

          if (backtrack(row + 1)) {
            return true;
          }

          queens.pop();
          stats.swaps += 1;
          steps.push(
            createStep({
              type: "backtrack",
              array: [size],
              explanation: `Row ${row}, column ${col} leads nowhere. Remove the queen and try the next column.`,
              activeLines: [4],
              activeCell: { row, col },
              placedCells: placedCells(),
              removedCells: [{ row, col }],
              stats,
            }),
          );
        }
      }

      return false;
    };

    const solved = backtrack(0);

    if (!solved) {
      steps.push(
        createStep({
          type: "complete",
          array: [size],
          explanation: `No solution exists for ${size} queens.`,
          activeLines: [4],
          placedCells: [],
          stats,
        }),
      );
    }

    return steps;
  },
};

export default nQueens;
