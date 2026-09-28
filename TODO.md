# Algorithm Reorganization Plan

## Phase 1: Update Homepage.jsx ✅ COMPLETE

- [x] Add "By Design Approach" section with categories:
  - [x] Divide and Conquer: Merge Sort, Quick Sort, Binary Search
  - [x] Dynamic Programming: Fibonacci, Knapsack (0/1), LCS
  - [x] Greedy: Dijkstra's, Prim's, Kruskal's, Huffman Coding
  - [x] Backtracking: N-Queens, Sudoku Solver
  - [x] Randomized: Karger's Algorithm
- [x] Add "By Type of Operation" section with categories:
  - [x] Sorting: Bubble, Selection, Insertion, Merge, Quick, Heap, Counting, Radix, Bucket Sort
  - [x] Searching: Linear Search, Binary Search, BFS, DFS
  - [x] Graph: Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim
  - [x] String & Compression: KMP, Rabin-Karp, Huffman Coding, Run-Length Encoding
- [x] Use Glassmorphism style
- [x] Keep existing feature cards

## Phase 2: Add Algorithm Files ✅ COMPLETE

### Sorting (existing + new)

- [x] bubbleSort.js (exists)
- [x] selectionSort.js (exists)
- [x] insertionSort.js (exists)
- [x] mergeSort.js (exists)
- [x] quickSort.js (exists)
- [x] heapSort.js (new)
- [x] countingSort.js (new)
- [x] radixSort.js (new)
- [x] bucketSort.js (new)

### Graph Algorithms

- [x] bfs.js (exists)
- [x] dfs.js (exists)
- [x] dijkstra.js (exists)
- [x] bellmanFord.js (new)
- [x] floydWarshall.js (new)
- [x] prim.js (new)
- [x] kruskal.js (new)

### Dynamic Programming

- [x] fibonacci.js (new)
- [x] knapsack.js (new)
- [x] lcs.js (new)

### String Algorithms

- [x] kmp.js (new)
- [x] rabinKarp.js (new)
- [x] huffmanCoding.js (new)
- [x] runLengthEncoding.js (new)

### Backtracking

- [x] nQueens.js (new)
- [x] sudokuSolver.js (new)

### Randomized

- [ ] kargerAlgorithm.js (new) - Not yet implemented

## Phase 3: Update Index Files ✅ COMPLETE

- [x] Update sorting/index.js to include new sorting algorithms
- [x] Update graph/index.js to include new graph algorithms
- [x] Create new index files for DP, String, Backtracking
- [x] Update main algorithms/index.js

## Summary

All major tasks completed! The DSA Visualizer now includes:

**By Design Approach:**

- Divide and Conquer
- Dynamic Programming
- Greedy
- Backtracking
- Randomized

**By Type of Operation:**

- Sorting (9 algorithms)
- Searching
- Graph
- String & Compression

**Total: 30+ Algorithms**
