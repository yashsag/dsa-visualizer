import fibonacci from "../dp/fibonacci";
import knapsack from "../dp/knapsack";

const realFib = (n) => {
  const dp = [0, 1];
  for (let i = 2; i <= n; i += 1) dp.push(dp[i - 1] + dp[i - 2]);
  return dp[n];
};

const bruteKnapsack = (weights, values, capacity) => {
  const n = weights.length;
  let best = 0;
  for (let mask = 0; mask < 1 << n; mask += 1) {
    let w = 0;
    let v = 0;
    for (let i = 0; i < n; i += 1) {
      if (mask & (1 << i)) {
        w += weights[i];
        v += values[i];
      }
    }
    if (w <= capacity) best = Math.max(best, v);
  }
  return best;
};

describe("fibonacci", () => {
  test("matches closed-form recurrence for various input sizes", () => {
    [0, 3, 8, 24].forEach((size) => {
      const input = Array.from({ length: size }, () => 1);
      const steps = fibonacci.generateSteps(input);
      const last = steps[steps.length - 1];
      const n = Math.max(5, Math.min(12, size || 8));
      expect(last.table[0][n]).toBe(realFib(n));
    });
  });
});

describe("knapsack-01", () => {
  test("matches brute-force optimum", () => {
    [[], [3, 6], [5, 10]].forEach((input) => {
      const steps = knapsack.generateSteps(input);
      const last = steps[steps.length - 1];
      const itemCount = last.array[0];
      const capacity = last.array[1];
      const weights = Array.from({ length: itemCount }, (_, i) => 1 + ((i * 2) % capacity));
      const values = Array.from({ length: itemCount }, (_, i) => 10 + ((i * 7) % 20));
      const expected = bruteKnapsack(weights, values, capacity);
      expect(last.table[itemCount][capacity]).toBe(expected);
    });
  });
});
