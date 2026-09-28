import { createStats, createStep } from "../helpers";

const selectionSort = {
  id: "selection-sort",
  name: "Selection Sort",
  description:
    "Repeatedly selects the smallest remaining value and swaps it into the next sorted position.",
  timeComplexity: "O(n^2)",
  spaceComplexity: "O(1)",
  codeLanguage: "Pseudo",
  code: [
    "1. Repeat for each position from left to right.",
    "2. Scan the remaining values to find the minimum.",
    "3. Swap the minimum into the current position.",
    "4. Mark the current position as sorted.",
  ],
  generateSteps(input) {
    const array = [...input];
    const steps = [];
    const sortedIndices = [];
    const stats = createStats();

    steps.push(
      createStep({
        type: "initialize",
        array,
        explanation: "Selection Sort starts with the full array unsorted.",
        activeLines: [1],
        sortedIndices,
        stats,
      }),
    );

    for (let start = 0; start < array.length - 1; start += 1) {
      let minIndex = start;

      for (let index = start + 1; index < array.length; index += 1) {
        stats.comparisons += 1;
        stats.iterations += 1;

        steps.push(
          createStep({
            type: "compare",
            array,
            explanation: `Compare ${array[index]} against current minimum ${array[minIndex]}.`,
            activeLines: [2],
            indices: [minIndex, index],
            sortedIndices,
            stats,
          }),
        );

        if (array[index] < array[minIndex]) {
          minIndex = index;
        }
      }

      if (minIndex !== start) {
        stats.swaps += 1;
        [array[start], array[minIndex]] = [array[minIndex], array[start]];

        steps.push(
          createStep({
            type: "swap",
            array,
            explanation: `Swap ${array[start]} into position ${start}.`,
            activeLines: [3],
            indices: [start, minIndex],
            sortedIndices,
            stats,
          }),
        );
      }

      sortedIndices.push(start);
      steps.push(
        createStep({
          type: "mark-sorted",
          array,
          explanation: `${array[start]} is now locked in its final position.`,
          activeLines: [4],
          indices: [start],
          sortedIndices,
          stats,
        }),
      );
    }

    sortedIndices.push(array.length - 1);
    steps.push(
      createStep({
        type: "complete",
        array,
        explanation: "Selection Sort finished. Every value is in ascending order.",
        activeLines: [4],
        sortedIndices: array.map((_, index) => index),
        stats,
      }),
    );

    return steps;
  },
};

export default selectionSort;
