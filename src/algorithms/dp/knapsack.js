import { createStats, createStep } from "../helpers";

const knapsack = {
  id: "knapsack-01",
  name: "Knapsack (0/1)",
  description: "Explores item choices with memoized subproblems.",
  timeComplexity: "O(nW)",
  spaceComplexity: "O(nW)",
  codeLanguage: "Pseudo",
  code: [
    "1. Build a table of items x capacity, all zeros.",
    "2. For each item and capacity, skip the item by default.",
    "3. If the item fits, take the better of skipping or taking it.",
    "4. The final cell holds the best achievable value.",
  ],
  generateSteps(input) {
    const itemCount = Math.max(1, Math.min(6, input.length === 2 ? Math.round(input[0]) : 4));
    const capacity = Math.max(1, Math.min(12, input.length === 2 ? Math.round(input[1]) : 7));

    const weights = Array.from({ length: itemCount }, (_, i) => 1 + ((i * 2) % capacity));
    const values = Array.from({ length: itemCount }, (_, i) => 10 + ((i * 7) % 20));

    const steps = [];
    const stats = createStats();
    const dp = Array.from({ length: itemCount + 1 }, () => Array(capacity + 1).fill(0));

    steps.push(
      createStep({
        type: "initialize",
        array: [itemCount, capacity],
        explanation: `Build a ${itemCount + 1} x ${capacity + 1} table. Row 0 and column 0 stay 0 (no items or no capacity).`,
        activeLines: [1],
        table: dp.map((r) => [...r]),
        stats,
      }),
    );

    for (let item = 1; item <= itemCount; item += 1) {
      const weight = weights[item - 1];
      const value = values[item - 1];

      for (let cap = 0; cap <= capacity; cap += 1) {
        stats.iterations += 1;
        dp[item][cap] = dp[item - 1][cap];

        if (weight <= cap) {
          stats.comparisons += 1;
          const candidate = dp[item - 1][cap - weight] + value;
          if (candidate > dp[item][cap]) {
            dp[item][cap] = candidate;
          }

          steps.push(
            createStep({
              type: "fill",
              array: [itemCount, capacity],
              explanation: `Item ${item} (w=${weight}, v=${value}) at capacity ${cap}: best of skip (${dp[item - 1][cap]}) or take (${candidate}) = ${dp[item][cap]}.`,
              activeLines: [2, 3],
              table: dp.map((r) => [...r]),
              indices: [item * (capacity + 1) + cap],
              stats,
            }),
          );
        } else {
          steps.push(
            createStep({
              type: "skip",
              array: [itemCount, capacity],
              explanation: `Item ${item} (w=${weight}) does not fit in capacity ${cap}. Carry forward ${dp[item][cap]}.`,
              activeLines: [2],
              table: dp.map((r) => [...r]),
              indices: [item * (capacity + 1) + cap],
              stats,
            }),
          );
        }
      }
    }

    steps.push(
      createStep({
        type: "complete",
        array: [itemCount, capacity],
        explanation: `Best achievable value with capacity ${capacity} is ${dp[itemCount][capacity]}.`,
        activeLines: [4],
        table: dp.map((r) => [...r]),
        indices: [itemCount * (capacity + 1) + capacity],
        stats,
      }),
    );

    return steps;
  },
};

export default knapsack;
