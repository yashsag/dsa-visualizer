import { createStats, createStep } from "../helpers";

const heapSort = {
  id: "heap-sort",
  name: "Heap Sort",
  description:
    "Builds a max-heap, then repeatedly moves the largest value to the end of the array.",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(1)",
  codeLanguage: "Pseudo",
  code: [
    "1. Build a max-heap from the array.",
    "2. Swap the heap root with the last unsorted value.",
    "3. Sift the new root down to restore the heap property.",
    "4. Repeat until every value is sorted.",
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
        explanation: "Heap Sort starts with the full array unsorted.",
        activeLines: [1],
        sortedIndices,
        stats,
      }),
    );

    const siftDown = (heapSize, root) => {
      let largest = root;

      for (;;) {
        const left = 2 * largest + 1;
        const right = 2 * largest + 2;
        let candidate = largest;

        if (left < heapSize) {
          stats.comparisons += 1;
          stats.iterations += 1;
          steps.push(
            createStep({
              type: "compare",
              array,
              explanation: `Compare ${array[candidate]} against left child ${array[left]}.`,
              activeLines: [1, 3],
              indices: [candidate, left],
              sortedIndices,
              stats,
            }),
          );
          if (array[left] > array[candidate]) {
            candidate = left;
          }
        }

        if (right < heapSize) {
          stats.comparisons += 1;
          stats.iterations += 1;
          steps.push(
            createStep({
              type: "compare",
              array,
              explanation: `Compare ${array[candidate]} against right child ${array[right]}.`,
              activeLines: [1, 3],
              indices: [candidate, right],
              sortedIndices,
              stats,
            }),
          );
          if (array[right] > array[candidate]) {
            candidate = right;
          }
        }

        if (candidate === largest) {
          return;
        }

        stats.swaps += 1;
        [array[largest], array[candidate]] = [array[candidate], array[largest]];
        steps.push(
          createStep({
            type: "swap",
            array,
            explanation: `Swap ${array[largest]} down to restore the heap property.`,
            activeLines: [3],
            indices: [largest, candidate],
            sortedIndices,
            stats,
          }),
        );

        largest = candidate;
      }
    };

    for (let root = Math.floor(array.length / 2) - 1; root >= 0; root -= 1) {
      siftDown(array.length, root);
    }

    for (let end = array.length - 1; end > 0; end -= 1) {
      stats.swaps += 1;
      [array[0], array[end]] = [array[end], array[0]];
      steps.push(
        createStep({
          type: "swap",
          array,
          explanation: `Move the largest remaining value ${array[end]} to position ${end}.`,
          activeLines: [2],
          indices: [0, end],
          sortedIndices,
          stats,
        }),
      );

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

      siftDown(end, 0);
    }

    if (array.length && !sortedIndices.includes(0)) {
      sortedIndices.unshift(0);
    }

    steps.push(
      createStep({
        type: "complete",
        array,
        explanation: "Heap Sort finished. Every value is in ascending order.",
        activeLines: [4],
        sortedIndices: array.map((_, index) => index),
        stats,
      }),
    );

    return steps;
  },
};

export default heapSort;
