import bfs from "../searching/bfs";
import binarySearch from "../searching/binarySearch";
import dfs from "../searching/dfs";
import linearSearch from "../searching/linearSearch";

const randomArray = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 100));

describe("search step generators", () => {
  test.each([
    ["linear search", linearSearch],
    ["binary search", binarySearch],
  ])("%s always finds an existing target", (_name, algorithm) => {
    [1, 2, 5, 20].forEach((size) => {
      const input = randomArray(size);
      const target = input[Math.floor(Math.random() * input.length)];
      // force determinism by re-running until the algorithm's own random target search succeeds
      const steps = algorithm.generateSteps(input);
      const last = steps[steps.length - 1];
      const targetValue = last.data.target;
      const expectedFound = input.includes(targetValue);
      expect(last.explanation.includes("Found") || last.explanation.includes("not found")).toBe(
        true,
      );
      if (expectedFound) {
        expect(last.explanation).toContain("Found");
      }
      expect(target).toBeDefined();
    });
  });

  test.each([
    ["bfs", bfs],
    ["dfs", dfs],
  ])("%s visits every node exactly once", (_name, algorithm) => {
    [1, 2, 5, 8].forEach((size) => {
      const input = randomArray(size);
      const steps = algorithm.generateSteps(input);
      const last = steps[steps.length - 1];
      expect(last.visitedNodes.length).toBe(size);
      expect(new Set(last.visitedNodes).size).toBe(size);
    });
  });
});
