import { createScaffoldAlgorithm } from "../helpers";

export const stringAlgorithms = [
  createScaffoldAlgorithm({
    id: "kmp",
    name: "KMP",
    description:
      "Uses a prefix table to avoid rechecking known matches.",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(m)",
    visualType: "string",
  }),
  createScaffoldAlgorithm({
    id: "rabin-karp",
    name: "Rabin-Karp",
    description: "Matches windows using rolling hashes.",
    timeComplexity: "O(n + m) average",
    spaceComplexity: "O(1)",
    visualType: "string",
  }),
  createScaffoldAlgorithm({
    id: "huffman-coding",
    name: "Huffman Coding",
    description:
      "Compresses symbols using variable-length prefix codes.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    visualType: "string",
  }),
  createScaffoldAlgorithm({
    id: "run-length-encoding",
    name: "Run-Length Encoding",
    description:
      "Collapses consecutive repeated symbols into counts.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    visualType: "string",
  }),
];
