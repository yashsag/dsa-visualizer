import { createStats, createStep } from "../helpers";

const fibonacci = {
  id: "fibonacci",
  name: "Fibonacci",
  description: "Builds subproblem results from the bottom up.",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  codeLanguage: "Pseudo",
  code: [
    "1. Seed the table with fib(0) = 0 and fib(1) = 1.",
    "2. Compute the next value as the sum of the two before it.",
    "3. Store it in the table.",
    "4. Repeat until fib(n) is filled in.",
  ],
  generateSteps(input) {
    const n = Math.max(5, Math.min(12, input.length || 8));
    const steps = [];
    const stats = createStats();
    const dp = Array(n + 1).fill("");

    const row = () => [[...dp]];

    dp[0] = 0;
    steps.push(
      createStep({
        type: "initialize",
        array: input,
        explanation: `Seed fib(0) = 0. Build the table up to fib(${n}).`,
        activeLines: [1],
        table: row(),
        indices: [0],
        stats,
      }),
    );

    if (n >= 1) {
      dp[1] = 1;
      steps.push(
        createStep({
          type: "seed",
          array: input,
          explanation: "Seed fib(1) = 1.",
          activeLines: [1],
          table: row(),
          indices: [1],
          stats,
        }),
      );
    }

    for (let i = 2; i <= n; i += 1) {
      stats.iterations += 1;
      dp[i] = dp[i - 1] + dp[i - 2];

      steps.push(
        createStep({
          type: "fill",
          array: input,
          explanation: `fib(${i}) = fib(${i - 1}) + fib(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}.`,
          activeLines: [2, 3],
          table: row(),
          indices: [i, i - 1, i - 2],
          stats,
        }),
      );
    }

    steps.push(
      createStep({
        type: "complete",
        array: input,
        explanation: `Finished. fib(${n}) = ${dp[n]}.`,
        activeLines: [4],
        table: row(),
        indices: [n],
        stats,
      }),
    );

    return steps;
  },
};

export default fibonacci;
