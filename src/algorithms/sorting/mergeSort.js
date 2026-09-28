import { createStats, createStep } from "../helpers";

const mergeSort = {
  id: "merge-sort",
  name: "Merge Sort",
  description:
    "Splits the array into halves, sorts each half recursively, and merges the results back together.",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",
  codeLanguage: "Pseudo",
  code: [
    "1. Split the array into two halves.",
    "2. Recursively sort the left half.",
    "3. Recursively sort the right half.",
    "4. Compare the front values of both halves.",
    "5. Write the smaller value back into the array.",
    "6. Continue until the merged range is sorted.",
  ],
  generateSteps(input) {
    const array = [...input];
    const steps = [];
    const stats = createStats();

    steps.push(
      createStep({
        type: "initialize",
        array,
        explanation: "Merge Sort begins by viewing the full array as one range to divide.",
        activeLines: [1],
        stats,
      }),
    );

    const mergeRanges = (start, middle, end) => {
      const left = array.slice(start, middle + 1);
      const right = array.slice(middle + 1, end + 1);
      let leftIndex = 0;
      let rightIndex = 0;
      let targetIndex = start;

      while (leftIndex < left.length && rightIndex < right.length) {
        stats.comparisons += 1;
        stats.iterations += 1;

        steps.push(
          createStep({
            type: "compare",
            array,
            explanation: `Compare ${left[leftIndex]} from the left half with ${right[rightIndex]} from the right half.`,
            activeLines: [4],
            indices: [start + leftIndex, middle + 1 + rightIndex],
            stats,
          }),
        );

        if (left[leftIndex] <= right[rightIndex]) {
          array[targetIndex] = left[leftIndex];
          steps.push(
            createStep({
              type: "overwrite",
              array,
              explanation: `${left[leftIndex]} is smaller, so write it into position ${targetIndex}.`,
              activeLines: [5],
              indices: [targetIndex],
              stats,
            }),
          );
          leftIndex += 1;
        } else {
          array[targetIndex] = right[rightIndex];
          steps.push(
            createStep({
              type: "overwrite",
              array,
              explanation: `${right[rightIndex]} is smaller, so write it into position ${targetIndex}.`,
              activeLines: [5],
              indices: [targetIndex],
              stats,
            }),
          );
          rightIndex += 1;
        }

        targetIndex += 1;
      }

      while (leftIndex < left.length) {
        stats.iterations += 1;
        array[targetIndex] = left[leftIndex];
        steps.push(
          createStep({
            type: "overwrite",
            array,
            explanation: `Copy the remaining left value ${left[leftIndex]} into position ${targetIndex}.`,
            activeLines: [6],
            indices: [targetIndex],
            stats,
          }),
        );
        leftIndex += 1;
        targetIndex += 1;
      }

      while (rightIndex < right.length) {
        stats.iterations += 1;
        array[targetIndex] = right[rightIndex];
        steps.push(
          createStep({
            type: "overwrite",
            array,
            explanation: `Copy the remaining right value ${right[rightIndex]} into position ${targetIndex}.`,
            activeLines: [6],
            indices: [targetIndex],
            stats,
          }),
        );
        rightIndex += 1;
        targetIndex += 1;
      }
    };

    const sortRange = (start, end) => {
      if (start >= end) {
        return;
      }

      const middle = Math.floor((start + end) / 2);

      steps.push(
        createStep({
          type: "split",
          array,
          explanation: `Split the range ${start}-${end} at midpoint ${middle}.`,
          activeLines: [1],
          indices: [start, middle, end],
          stats,
        }),
      );

      sortRange(start, middle);
      sortRange(middle + 1, end);
      mergeRanges(start, middle, end);

      steps.push(
        createStep({
          type: "merge",
          array,
          explanation: `The range ${start}-${end} has been merged into sorted order.`,
          activeLines: [6],
          indices: Array.from({ length: end - start + 1 }, (_, offset) => start + offset),
          stats,
        }),
      );
    };

    if (array.length > 1) {
      sortRange(0, array.length - 1);
    }

    steps.push(
      createStep({
        type: "complete",
        array,
        explanation: "Merge Sort finished combining all ranges into one sorted array.",
        activeLines: [6],
        sortedIndices: array.map((_, index) => index),
        stats,
      }),
    );

    return steps;
  },
};

export default mergeSort;
