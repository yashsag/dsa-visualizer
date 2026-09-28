import { createStats, createStep } from "../helpers";

const quickSort = {
  id: "quick-sort",
  name: "Quick Sort",
  description:
    "Chooses a pivot, partitions smaller values to the left and larger values to the right, then repeats on each side.",
  timeComplexity: "O(n log n) average",
  spaceComplexity: "O(log n)",
  codeLanguage: "Pseudo",
  code: [
    "1. Choose the last value as the pivot.",
    "2. Scan the range from left to right.",
    "3. Move values smaller than the pivot to the front partition.",
    "4. Place the pivot between the two partitions.",
    "5. Recursively sort the left and right partitions.",
  ],
  generateSteps(input) {
    const array = [...input];
    const steps = [];
    const sorted = new Set();
    const stats = createStats();

    steps.push(
      createStep({
        type: "initialize",
        array,
        explanation: "Quick Sort starts by selecting a pivot for the whole array.",
        activeLines: [1],
        stats,
      }),
    );

    const partition = (low, high) => {
      const pivotValue = array[high];
      let partitionIndex = low;

      steps.push(
        createStep({
          type: "pivot",
          array,
          explanation: `${pivotValue} is chosen as the pivot for range ${low}-${high}.`,
          activeLines: [1],
          indices: [high],
          pivotIndex: high,
          sortedIndices: [...sorted],
          stats,
        }),
      );

      for (let scan = low; scan < high; scan += 1) {
        stats.comparisons += 1;
        stats.iterations += 1;

        steps.push(
          createStep({
            type: "compare",
            array,
            explanation: `Compare ${array[scan]} against pivot ${pivotValue}.`,
            activeLines: [2],
            indices: [scan, high],
            pivotIndex: high,
            sortedIndices: [...sorted],
            stats,
          }),
        );

        if (array[scan] < pivotValue) {
          if (partitionIndex !== scan) {
            stats.swaps += 1;
            [array[partitionIndex], array[scan]] = [array[scan], array[partitionIndex]];
            steps.push(
              createStep({
                type: "swap",
                array,
                explanation: `Move ${array[partitionIndex]} into the smaller-than-pivot partition.`,
                activeLines: [3],
                indices: [partitionIndex, scan],
                pivotIndex: high,
                sortedIndices: [...sorted],
                stats,
              }),
            );
          }
          partitionIndex += 1;
        }
      }

      if (partitionIndex !== high) {
        stats.swaps += 1;
        [array[partitionIndex], array[high]] = [array[high], array[partitionIndex]];
      }

      steps.push(
        createStep({
          type: "swap",
          array,
          explanation: `Place pivot ${array[partitionIndex]} at index ${partitionIndex}.`,
          activeLines: [4],
          indices: [partitionIndex, high],
          pivotIndex: partitionIndex,
          sortedIndices: [...sorted],
          stats,
        }),
      );

      sorted.add(partitionIndex);
      return partitionIndex;
    };

    const sortRange = (low, high) => {
      if (low > high) {
        return;
      }

      if (low === high) {
        sorted.add(low);
        steps.push(
          createStep({
            type: "mark-sorted",
            array,
            explanation: `${array[low]} is a single-value partition, so it is already sorted.`,
            activeLines: [5],
            indices: [low],
            sortedIndices: [...sorted].sort((a, b) => a - b),
            stats,
          }),
        );
        return;
      }

      const pivotIndex = partition(low, high);

      steps.push(
        createStep({
          type: "partition",
          array,
          explanation: `Partition complete. Values left of index ${pivotIndex} are smaller than the pivot, and values right of it are larger.`,
          activeLines: [5],
          indices: [low, pivotIndex, high],
          pivotIndex,
          sortedIndices: [...sorted].sort((a, b) => a - b),
          stats,
        }),
      );

      sortRange(low, pivotIndex - 1);
      sortRange(pivotIndex + 1, high);
    };

    if (array.length > 1) {
      sortRange(0, array.length - 1);
    } else if (array.length === 1) {
      sorted.add(0);
    }

    steps.push(
      createStep({
        type: "complete",
        array,
        explanation: "Quick Sort finished partitioning the array into sorted order.",
        activeLines: [5],
        sortedIndices: array.map((_, index) => index),
        stats,
      }),
    );

    return steps;
  },
};

export default quickSort;
