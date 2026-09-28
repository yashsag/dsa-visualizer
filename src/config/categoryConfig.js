import { backtrackingAlgorithms } from "../algorithms/backtracking";
import { divideConquerAlgorithms } from "../algorithms/divideConquer";
import { dpAlgorithms } from "../algorithms/dp";
import { graphAlgorithms } from "../algorithms/graph";
import { greedyAlgorithms } from "../algorithms/greedy";
import { randomizedAlgorithms } from "../algorithms/randomized";
import { searchingAlgorithms } from "../algorithms/searching";
import { sortingAlgorithms } from "../algorithms/sorting";
import { stringAlgorithms } from "../algorithms/string";

export const categoryConfig = [
  {
    slug: "divide-and-conquer",
    title: "Divide & Conquer",
    description:
      "Break large problems into smaller independent subproblems and combine the results.",
    accent: "#60a5fa",
    algorithms: divideConquerAlgorithms,
    defaultAlgorithmId: "merge-sort",
  },
  {
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    description:
      "Reuse overlapping subproblems to trade memory for speed.",
    accent: "#a78bfa",
    algorithms: dpAlgorithms,
    defaultAlgorithmId: "fibonacci",
  },
  {
    slug: "greedy",
    title: "Greedy",
    description: "Commit to the locally best choice at each step.",
    accent: "#fb923c",
    algorithms: greedyAlgorithms,
    defaultAlgorithmId: "dijkstra",
  },
  {
    slug: "backtracking",
    title: "Backtracking",
    description:
      "Search through possibilities and undo invalid decisions.",
    accent: "#f472b6",
    algorithms: backtrackingAlgorithms,
    defaultAlgorithmId: "n-queens",
  },
  {
    slug: "randomized",
    title: "Randomized",
    description:
      "Use randomness to drive the search or reduce expected complexity.",
    accent: "#22d3ee",
    algorithms: randomizedAlgorithms,
    defaultAlgorithmId: "kargers-algorithm",
  },
  {
    slug: "sorting",
    title: "Sorting",
    description:
      "Reorder data into ascending structure with visual, step-by-step playback.",
    accent: "#34d399",
    algorithms: sortingAlgorithms,
    defaultAlgorithmId: "bubble-sort",
  },
  {
    slug: "searching",
    title: "Searching",
    description:
      "Find targets efficiently across arrays, trees, and graphs.",
    accent: "#38bdf8",
    algorithms: searchingAlgorithms,
    defaultAlgorithmId: "linear-search",
  },
  {
    slug: "graph",
    title: "Graph",
    description:
      "Traverse, connect, and optimize networks of nodes and edges.",
    accent: "#818cf8",
    algorithms: graphAlgorithms,
    defaultAlgorithmId: "dijkstra",
  },
  {
    slug: "string",
    title: "String",
    description:
      "Match, compress, and transform text-oriented data.",
    accent: "#f59e0b",
    algorithms: stringAlgorithms,
    defaultAlgorithmId: "kmp",
  },
];

export const getCategoryBySlug = (slug) =>
  categoryConfig.find((category) => category.slug === slug);
