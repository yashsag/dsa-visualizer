import { createStats, createStep } from "../helpers";

const linearSearch = {
  id: "linear-search",
  name: "Linear Search",
  description: "Scans elements one by one until the target is found.",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  codeLanguage: "Pseudo",
  code: [
    "1. Pick a target value to look for.",
    "2. Walk through the array from left to right.",
    "3. Compare each value against the target.",
    "4. Stop when the target is found or the array ends.",
  ],
  generateSteps(input) {
    const array = [...input];
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
            : `Search for ${target} by scanning left to right.`,
        activeLines: [1],
        data: { target },
        stats,
      }),
    );

    for (let index = 0; index < array.length; index += 1) {
      stats.comparisons += 1;
      stats.iterations += 1;

      steps.push(
        createStep({
          type: "compare",
          array,
          explanation: `Check index ${index}: is ${array[index]} equal to ${target}?`,
          activeLines: [3],
          indices: [index],
          data: { target },
          stats,
        }),
      );

      if (array[index] === target) {
        steps.push(
          createStep({
            type: "complete",
            array,
            explanation: `Found ${target} at index ${index}.`,
            activeLines: [4],
            pivotIndex: index,
            data: { target },
            stats,
          }),
        );
        return steps;
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

export default linearSearch;
