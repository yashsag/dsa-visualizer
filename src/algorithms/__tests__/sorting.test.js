import bubbleSort from "../sorting/bubbleSort";
import heapSort from "../sorting/heapSort";
import insertionSort from "../sorting/insertionSort";
import mergeSort from "../sorting/mergeSort";
import quickSort from "../sorting/quickSort";
import selectionSort from "../sorting/selectionSort";

const getFinalArray = (algorithm, input) => {
  const steps = algorithm.generateSteps(input);
  return steps[steps.length - 1].array;
};

const randomArray = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 100));

describe("sorting step generators", () => {
  test("bubble sort generates a sorted final array", () => {
    expect(getFinalArray(bubbleSort, [5, 1, 4, 2, 8])).toEqual([1, 2, 4, 5, 8]);
  });

  test("merge sort generates overwrite steps and sorts correctly", () => {
    const steps = mergeSort.generateSteps([38, 27, 43, 3, 9, 82, 10]);
    expect(steps.some((step) => step.type === "overwrite")).toBe(true);
    expect(steps[steps.length - 1].array).toEqual([3, 9, 10, 27, 38, 43, 82]);
  });

  test("quick sort tracks pivot steps and sorts correctly", () => {
    const steps = quickSort.generateSteps([10, 7, 8, 9, 1, 5]);
    expect(steps.some((step) => step.type === "pivot")).toBe(true);
    expect(steps[steps.length - 1].array).toEqual([1, 5, 7, 8, 9, 10]);
  });

  test.each([
    ["selection sort", selectionSort],
    ["insertion sort", insertionSort],
    ["heap sort", heapSort],
  ])("%s sorts random arrays correctly, including edge sizes", (_name, algorithm) => {
    [0, 1, 2, 5, 20].forEach((size) => {
      const input = randomArray(size);
      const expected = [...input].sort((a, b) => a - b);
      expect(getFinalArray(algorithm, input)).toEqual(expected);
    });
  });

  test.each([
    ["bubble sort", bubbleSort],
    ["selection sort", selectionSort],
    ["heap sort", heapSort],
  ])(
    "%s does not retroactively mark early steps as fully sorted (shared-array-reference regression)",
    (_name, algorithm) => {
      const steps = algorithm.generateSteps(randomArray(20));
      const earlyStep = steps[Math.floor(steps.length / 4)];
      expect(earlyStep.sortedIndices.length).toBeLessThan(20);
    },
  );
});
