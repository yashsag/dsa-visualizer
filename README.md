# Algorithm Visualizer 🎯

An interactive, feature-rich algorithm visualizer built with React that demonstrates how sorting, searching, and graph algorithms work in real-time. Perfect for computer science students, educators, and anyone learning algorithms.

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### Sorting Algorithms

- **Bubble Sort** - Visualize pairwise comparisons and swaps
- **Selection Sort** - Watch the algorithm find minimum elements
- **Insertion Sort** - See how sorted portion builds incrementally
- **Merge Sort** - Observe divide-and-conquer in action
- **Quick Sort** - Watch partitioning and recursive sorting

### Searching Algorithms

- **Linear Search** - Sequential element searching
- **Binary Search** - Efficient divide-and-conquer on sorted arrays

### Graph Algorithms

- **Breadth-First Search (BFS)** - Level-by-level traversal
- **Depth-First Search (DFS)** - Depth-first traversal
- **Dijkstra's Algorithm** - Shortest path with weighted edges

## 🚀 Key Features

### 🎨 Beautiful UI/UX

- **Dark/Light Theme** - Toggle between themes with persistence
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Fluid bar and node transitions
- **Color-coded States** - Visual distinction between comparing, visiting, visited, and sorted elements

### 📊 Live Statistics

- Real-time comparison, swap, and iteration counters
- Big-O complexity display (Best, Average, Worst case)
- Space complexity information

### 🔧 Advanced Controls

- **Speed Control** - Adjust animation speed (1-10x)
- **Array Size** - Generate arrays from 5 to 50 elements
- **Compare Mode** - Run two algorithms side-by-side
- **Keyboard Shortcuts** - Space (Start/Pause), R (Generate), ↑/↓ (Speed)

### ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader announcements
- High contrast mode support

### 🧪 Testing

- Comprehensive unit tests for all sorting algorithms
- Correctness verification with seeded test cases

## 🎮 How to Use

1. **Select an Algorithm** - Choose from the sidebar (Sorting/Searching/Graph)
2. **Generate Array** - Click "Generate" or press R
3. **Start Visualization** - Click "Start" or press Space
4. **Control Speed** - Use the slider or ↑/↓ keys
5. **Watch & Learn** - Observe the step-by-step execution

## ⌨️ Keyboard Shortcuts

| Key     | Action                    |
| ------- | ------------------------- |
| `Space` | Start/Pause visualization |
| `R`     | Generate new array        |
| `↑`     | Increase speed            |
| `↓`     | Decrease speed            |

## 🛠️ Installation

```
bash
# Clone the repository
git clone https://github.com/yourusername/algorithm-visualizer.git

# Navigate to project directory
cd algorithm-visualizer

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── algorithms/           # Algorithm implementations
│   ├── sorting/         # Bubble, Selection, Insertion, Merge, Quick Sort
│   ├── searching/       # Linear, Binary Search
│   ├── graph/           # BFS, DFS, Dijkstra
│   └── __tests__/       # Unit tests
├── components/          # React components
│   ├── Bars.jsx         # Sorting visualization
│   ├── Controls.jsx     # User controls
│   ├── GraphVisualizer.jsx
│   └── Sidebar.jsx     # Algorithm selection
├── context/
│   └── ThemeContext.js # Dark/light theme management
├── pages/
│   └── Visualizer.jsx  # Main visualizer page
├── App.js               # Root component
├── App.css              # App styles
└── index.css            # Global styles with CSS variables
```

## 🎨 Color Legend

| Color     | Meaning             |
| --------- | ------------------- |
| 🔵 Blue   | Default/Unvisited   |
| 🟠 Orange | Currently Comparing |
| 🟡 Yellow | Visiting            |
| 🟢 Green  | Visited/Sorted      |
| 🟡 Gold   | Path/Result         |

## 🔬 Big-O Complexity Reference

| Algorithm      | Time (Best)  | Time (Avg)   | Time (Worst) | Space    |
| -------------- | ------------ | ------------ | ------------ | -------- |
| Bubble Sort    | O(n)         | O(n²)        | O(n²)        | O(1)     |
| Selection Sort | O(n²)        | O(n²)        | O(n²)        | O(1)     |
| Insertion Sort | O(n)         | O(n²)        | O(n²)        | O(1)     |
| Merge Sort     | O(n log n)   | O(n log n)   | O(n log n)   | O(n)     |
| Quick Sort     | O(n log n)   | O(n log n)   | O(n²)        | O(log n) |
| Linear Search  | O(1)         | O(n)         | O(n)         | O(1)     |
| Binary Search  | O(1)         | O(log n)     | O(log n)     | O(1)     |
| BFS            | O(V+E)       | O(V+E)       | O(V+E)       | O(V)     |
| DFS            | O(V+E)       | O(V+E)       | O(V+E)       | O(V)     |
| Dijkstra       | O(V+E log V) | O(V+E log V) | O(V+E log V) | O(V)     |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by various algorithm visualizers
- Built with React 19
- Uses modern CSS features (CSS Variables, Flexbox, Grid)

---

<p align="center">Made with ❤️ for algorithm enthusiasts</p>
"# Algo_visualizer" 
