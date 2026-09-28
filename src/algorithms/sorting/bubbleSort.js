import { createStats, createStep } from "../helpers";

const bubbleSort = {
  id: "bubble-sort",
  name: "Bubble Sort",
  description:
    "Repeatedly compares adjacent values and pushes the largest value to the end of the array on each pass.",
  timeComplexity: "O(n^2)",
  spaceComplexity: "O(1)",
  codeLanguage: "Pseudo",
  code: [
    "1. Repeat passes across the array.",
    "2. Compare each adjacent pair.",
    "3. Swap if the left value is larger than the right value.",
    "4. Mark the last unsorted position as sorted.",
    "5. Stop early if a full pass makes no swaps.",
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
        explanation: "Bubble Sort starts with the full array unsorted.",
        activeLines: [1],
        sortedIndices,
        stats,
      }),
    );

    if (array.length <= 1) {
      steps.push(
        createStep({
          type: "complete",
          array,
          explanation: "The array is already sorted.",
          activeLines: [5],
          sortedIndices: array.map((_, index) => index),
          stats,
        }),
      );
      return steps;
    }

    for (let end = array.length - 1; end > 0; end -= 1) {
      let swapped = false;

      for (let index = 0; index < end; index += 1) {
        stats.comparisons += 1;
        stats.iterations += 1;

        steps.push(
          createStep({
            type: "compare",
            array,
            explanation: `Compare ${array[index]} and ${array[index + 1]}.`,
            activeLines: [2],
            indices: [index, index + 1],
            sortedIndices,
            stats,
          }),
        );

        if (array[index] > array[index + 1]) {
          swapped = true;
          stats.swaps += 1;
          [array[index], array[index + 1]] = [array[index + 1], array[index]];

          steps.push(
            createStep({
              type: "swap",
              array,
              explanation: `Swap the pair so ${array[index]} moves left and ${array[index + 1]} moves right.`,
              activeLines: [3],
              indices: [index, index + 1],
              sortedIndices,
              stats,
            }),
          );
        }
      }

      sortedIndices.unshift(end);
      steps.push(
        createStep({
          type: "mark-sorted",
          array,
          explanation: `${array[end]} is now locked in its final position.`,
          activeLines: [4],
          indices: [end],
          sortedIndices,
          stats,
        }),
      );

      if (!swapped) {
        const remaining = Array.from({ length: end }, (_, index) => index);
        sortedIndices.unshift(...remaining);
        steps.push(
          createStep({
            type: "complete",
            array,
            explanation: "No swaps happened in this pass, so the remaining values are already sorted.",
            activeLines: [5],
            sortedIndices: array.map((_, index) => index),
            stats,
          }),
        );
        return steps;
      }
    }

    if (!sortedIndices.includes(0)) {
      sortedIndices.unshift(0);
    }

    steps.push(
      createStep({
        type: "complete",
        array,
        explanation: "Bubble Sort finished. Every value is in ascending order.",
        activeLines: [5],
        sortedIndices: array.map((_, index) => index),
        stats,
      }),
    );

    return steps;
  },
};

export default bubbleSort;
