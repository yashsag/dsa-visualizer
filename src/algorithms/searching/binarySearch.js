import { createStats, createStep } from "../helpers";

const binarySearch = {
  id: "binary-search",
  name: "Binary Search",
  description: "Halves the active search window on each comparison.",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",
  codeLanguage: "Pseudo",
  code: [
    "1. Sort the array and pick a target value.",
    "2. Look at the middle of the active window.",
    "3. Narrow the window based on the comparison.",
    "4. Stop when the target is found or the window is empty.",
  ],
  generateSteps(input) {
    const array = [...input].sort((a, b) => a - b);
    const steps = [];
    const stats = createStats();
    const target = array.length
      ? array[Math.floor(Math.random() * array.length)]
      : null;

    steps.push(
      createStep({
        type: "initialize",
        array,
        explanation:
          target === null
            ? "The array is empty, so there is nothing to search."
            : `Array sorted. Search for ${target} using a shrinking window.`,
        activeLines: [1],
        data: { target },
        stats,
      }),
    );

    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      stats.comparisons += 1;
      stats.iterations += 1;

      steps.push(
        createStep({
          type: "compare",
          array,
          explanation: `Check the middle of [${low}, ${high}]: is ${array[mid]} equal to ${target}?`,
          activeLines: [2],
          indices: [mid],
          data: { target },
          stats,
        }),
      );

      if (array[mid] === target) {
        steps.push(
          createStep({
            type: "complete",
            array,
            explanation: `Found ${target} at index ${mid}.`,
            activeLines: [4],
            pivotIndex: mid,
            data: { target },
            stats,
          }),
        );
        return steps;
      }

      if (array[mid] < target) {
        low = mid + 1;
        steps.push(
          createStep({
            type: "narrow",
            array,
            explanation: `${array[mid]} is less than ${target}, so search the right half.`,
            activeLines: [3],
            indices: [mid],
            data: { target },
            stats,
          }),
        );
      } else {
        high = mid - 1;
        steps.push(
          createStep({
            type: "narrow",
            array,
            explanation: `${array[mid]} is greater than ${target}, so search the left half.`,
            activeLines: [3],
            indices: [mid],
            data: { target },
            stats,
          }),
        );
      }
    }

    steps.push(
      createStep({
        type: "complete",
        array,
        explanation: `${target} was not found in the array.`,
        activeLines: [4],
        data: { target },
        stats,
      }),
    );

    return steps;
  },
};

export default binarySearch;
