import { createStats, createStep } from "../helpers";

const insertionSort = {
  id: "insertion-sort",
  name: "Insertion Sort",
  description:
    "Builds a sorted prefix by inserting each new value into its correct position.",
  timeComplexity: "O(n^2)",
  spaceComplexity: "O(1)",
  codeLanguage: "Pseudo",
  code: [
    "1. Take the next unsorted value as the key.",
    "2. Compare the key against the sorted prefix.",
    "3. Shift larger values one position to the right.",
    "4. Insert the key into its correct slot.",
  ],
  generateSteps(input) {
    const array = [...input];
    const steps = [];
    const stats = createStats();

    steps.push(
      createStep({
        type: "initialize",
        array,
        explanation: "Insertion Sort treats the first value as a sorted prefix of size one.",
        activeLines: [1],
        sortedIndices: array.length ? [0] : [],
        stats,
      }),
    );

    for (let i = 1; i < array.length; i += 1) {
      const key = array[i];
      let j = i - 1;

      steps.push(
        createStep({
          type: "select-key",
          array,
          explanation: `Pick ${key} as the next value to insert.`,
          activeLines: [1],
          indices: [i],
          sortedIndices: Array.from({ length: i }, (_, index) => index),
          stats,
        }),
      );

      while (j >= 0 && array[j] > key) {
        stats.comparisons += 1;
        stats.iterations += 1;

        steps.push(
          createStep({
            type: "compare",
            array,
            explanation: `${array[j]} is greater than ${key}, so shift it right.`,
            activeLines: [2, 3],
            indices: [j, j + 1],
            sortedIndices: Array.from({ length: i }, (_, index) => index),
            stats,
          }),
        );

        array[j + 1] = array[j];
        stats.swaps += 1;
        j -= 1;
      }

      array[j + 1] = key;

      steps.push(
        createStep({
          type: "insert",
          array,
          explanation: `Insert ${key} at position ${j + 1}.`,
          activeLines: [4],
          indices: [j + 1],
          sortedIndices: Array.from({ length: i + 1 }, (_, index) => index),
          stats,
        }),
      );
    }

    steps.push(
      createStep({
        type: "complete",
        array,
        explanation: "Insertion Sort finished. Every value is in ascending order.",
        activeLines: [4],
        sortedIndices: array.map((_, index) => index),
        stats,
      }),
    );

    return steps;
  },
};

export default insertionSort;
