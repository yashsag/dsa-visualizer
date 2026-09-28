import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart2, Layers, Activity, Zap, CheckCircle, Code, Moon, Sun, GitBranch, Shuffle, Puzzle, Sparkles, Layers2, Search, Network, FileText } from 'lucide-react';

const Card = ({ title, subtitle, icon: Icon, children, gradient, isDark }) => {
  const theme = isDark ? darkTheme : lightTheme;
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      style={theme.glassCard}
    >
      <div style={theme.cardHeader}>
        <div style={{...theme.iconContainer, background: gradient === 'bg-blue-500' ? '#3b82f6' : gradient === 'bg-purple-500' ? '#a855f7' : gradient === 'bg-emerald-500' ? '#10b981' : gradient === 'bg-orange-500' ? '#f97316' : gradient === 'bg-pink-500' ? '#ec4899' : gradient === 'bg-yellow-500' ? '#eab308' : gradient === 'bg-cyan-500' ? '#06b6d4' : '#6366f1'}}>
          <Icon style={{width: 20, height: 20, color: 'white'}} />
        </div>
        <h3 style={theme.cardTitle}>{title}</h3>
      </div>
      <p style={theme.cardSubtitle}>{subtitle}</p>
      {children}
    </motion.div>
  );
};

const AlgorithmCard = ({ title, icon: Icon, gradient, onClick, theme }) => {
  const gradientColors = {
    'gradient-blue': 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    'gradient-purple': 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    'gradient-emerald': 'linear-gradient(135deg, #10b981, #059669)',
    'gradient-orange': 'linear-gradient(135deg, #f97316, #ea580c)',
    'gradient-pink': 'linear-gradient(135deg, #ec4899, #db2777)',
    'gradient-cyan': 'linear-gradient(135deg, #06b6d4, #0891b2)',
    'gradient-yellow': 'linear-gradient(135deg, #eab308, #ca8a04)',
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: theme.cardBackground,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div style={{
        background: gradientColors[gradient] || gradientColors['gradient-blue'],
        padding: '8px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon style={{width: 16, height: 16, color: 'white'}} />
      </div>
      <span style={{
        color: theme.textPrimary,
        fontSize: '0.9rem',
        fontWeight: '500',
      }}>
        {title}
      </span>
    </motion.div>
  );
};

const CategorySection = ({ title, icon: Icon, description, categories, theme, onAlgorithmClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ marginBottom: '48px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <Icon style={{ width: 24, height: 24, color: theme.accentColor }} />
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '700', 
          color: theme.textPrimary,
          background: `linear-gradient(90deg, ${theme.accentColor}, #8b5cf6)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {title}
        </h2>
      </div>
      <p style={{ color: theme.textSecondary, marginBottom: '24px', fontSize: '0.95rem' }}>
        {description}
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{
              background: theme.cardBackground,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: '16px',
              padding: '24px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                background: cat.gradient,
                padding: '8px',
                borderRadius: '8px',
              }}>
                <cat.icon style={{width: 18, height: 18, color: 'white'}} />
              </div>
              <h3 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                color: theme.textPrimary,
              }}>
                {cat.name}
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {cat.algorithms.map((algo, algoIdx) => (
                <AlgorithmCard
                  key={algoIdx}
                  title={algo.label}
                  icon={cat.icon}
                  gradient={cat.gradient}
                  onClick={() => onAlgorithmClick(cat.routeSlug, algo.id)}
                  theme={theme}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const DSADashboard = ({ onStartVisualization }) => {
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  const handleAlgorithmClick = (routeSlug, algorithmId) => {
    navigate(`/visualizer/${routeSlug}`, { state: { algorithmId } });
  };

  const handleStartVisualization = () => {
    navigate('/visualizer/sorting', { state: { algorithmId: 'bubble-sort' } });
  };

  // Section 1: By Design Approach
  const designApproachCategories = [
    { 
      name: 'Divide and Conquer', 
      routeSlug: 'divide-and-conquer',
      icon: Layers2,
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      algorithms: [
        { label: 'Merge Sort', id: 'merge-sort' },
        { label: 'Quick Sort', id: 'quick-sort' },
        { label: 'Binary Search', id: 'binary-search' },
      ]
    },
    { 
      name: 'Dynamic Programming', 
      routeSlug: 'dynamic-programming',
      icon: BarChart2,
      gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
      algorithms: [
        { label: 'Fibonacci', id: 'fibonacci' },
        { label: 'Knapsack (0/1)', id: 'knapsack-01' },
        { label: 'LCS', id: 'lcs' },
      ]
    },
    { 
      name: 'Greedy', 
      routeSlug: 'greedy',
      icon: Sparkles,
      gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
      algorithms: [
        { label: "Dijkstra's", id: 'dijkstras' },
        { label: "Prim's", id: 'prim' },
        { label: "Kruskal's", id: 'kruskals' },
        { label: 'Huffman Coding', id: 'huffman-coding' },
      ]
    },
    { 
      name: 'Backtracking', 
      routeSlug: 'backtracking',
      icon: Puzzle,
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
      algorithms: [
        { label: 'N-Queens', id: 'n-queens' },
        { label: 'Sudoku Solver', id: 'sudoku-solver' },
      ]
    },
    { 
      name: 'Randomized', 
      routeSlug: 'randomized',
      icon: Shuffle,
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      algorithms: [{ label: "Karger's Algorithm", id: 'kargers-algorithm' }]
    },
  ];

  // Section 2: By Type of Operation
  const operationTypeCategories = [
    { 
      name: 'Sorting', 
      routeSlug: 'sorting',
      icon: Layers,
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      algorithms: [
        { label: 'Bubble Sort', id: 'bubble-sort' },
        { label: 'Selection Sort', id: 'selection-sort' },
        { label: 'Insertion Sort', id: 'insertion-sort' },
        { label: 'Merge Sort', id: 'merge-sort' },
        { label: 'Quick Sort', id: 'quick-sort' },
        { label: 'Heap Sort', id: 'heap-sort' },
        { label: 'Counting Sort', id: 'counting-sort' },
        { label: 'Radix Sort', id: 'radix-sort' },
        { label: 'Bucket Sort', id: 'bucket-sort' },
      ]
    },
    { 
      name: 'Searching', 
      routeSlug: 'searching',
      icon: Search,
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      algorithms: [
        { label: 'Linear Search', id: 'linear-search' },
        { label: 'Binary Search', id: 'binary-search' },
        { label: 'BFS', id: 'bfs' },
        { label: 'DFS', id: 'dfs' },
      ]
    },
    { 
      name: 'Graph', 
      routeSlug: 'graph',
      icon: Network,
      gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
      algorithms: [
        { label: 'Dijkstra', id: 'dijkstra' },
        { label: 'Bellman-Ford', id: 'bellman-ford' },
        { label: 'Floyd-Warshall', id: 'floyd-warshall' },
        { label: 'Kruskal', id: 'kruskal' },
        { label: 'Prim', id: 'prim' },
      ]
    },
    { 
      name: 'String & Compression', 
      routeSlug: 'string',
      icon: FileText,
      gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
      algorithms: [
        { label: 'KMP', id: 'kmp' },
        { label: 'Rabin-Karp', id: 'rabin-karp' },
        { label: 'Huffman Coding', id: 'huffman-coding' },
        { label: 'Run-Length Encoding', id: 'run-length-encoding' },
      ]
    },
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .dashboard-container {
          min-height: 100vh;
          padding: 32px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          transition: background-color 0.3s ease, color 0.3s ease;
          overflow-x: hidden;
        }
        
        .glass-card {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }
        
        .text-gradient {
          background: linear-gradient(90deg, #34d399, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .btn-glow {
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .btn-glow:hover {
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.6);
          transform: translateY(-2px);
        }
        
        .theme-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 50;
          padding: 12px;
          border-radius: 50%;
          backdrop-filter: blur(12px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
          transform: scale(1.1);
        }
        
        .header {
          max-width: 1280px;
          margin: 0 auto 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .title {
          font-size: 2.25rem;
          font-weight: 700;
        }
        
        .subtitle {
          margin-top: 8px;
        }
        
        .start-btn {
          background: #10b981;
          color: #0f172a;
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .main-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
        }
        
        @media (min-width: 768px) {
          .main-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .section-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
          margin: 48px 0;
        }
        
        .chart-bars {
          height: 128px;
          display: flex;
          align-items: flex-end;
          gap: 4px;
          padding: 0 8px;
        }
        
        .chart-bar {
          flex: 1;
          border-radius: 2px 2px 0 0;
          transition: background 0.3s ease;
        }
        
        .code-blocks {
          display: flex;
          gap: 8px;
        }
        
        .code-block {
          flex: 1;
          padding: 8px;
          border-radius: 4px;
          font-size: 0.625rem;
          font-family: monospace;
        }
        
        .animation-bars {
          display: flex;
          justify-content: center;
          gap: 8px;
          align-items: center;
          height: 80px;
        }
        
        .anim-bar {
          width: 20px;
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        
        footer {
          max-width: 1280px;
          margin: 64px auto 0;
          padding-top: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          transition: all 0.3s ease;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .footer-stats {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        
        .footer-stat {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .footer-built {
          display: flex;
          align-items: center;
          gap: 8px;
          font-style: italic;
        }

        .scroll-indicator {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: theme.accentColor;
          padding: 12px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          z-index: 40;
        }
        
        .scroll-indicator:hover {
          transform: translateY(-3px);
        }
      `}</style>
      
      <div 
        className="dashboard-container"
        style={{ backgroundColor: theme.background, color: theme.textPrimary }}
      >
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={theme.themeToggle}
          aria-label="Toggle theme"
        >
          {isDark 
            ? <Sun style={{width: 20, height: 20, color: '#fbbf24'}} /> 
            : <Moon style={{width: 20, height: 20, color: '#475569'}} />
          }
        </motion.button>

        {/* Header */}
        <header className="header">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="title text-gradient"
            >
              DSA Visualizer
            </motion.h1>
            <p className="subtitle" style={theme.subtitle}>Interactive Algorithm Visualization | 30+ Algorithms</p>
          </div>
          <motion.button 
            onClick={handleStartVisualization}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-glow start-btn"
            style={theme.startButton}
          >
            <Zap style={{width: 20, height: 20}} /> 
            Start Visualizing
          </motion.button>
        </header>

        <main className="main-grid">
          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card 
              title="Live Big-O Charts" 
              subtitle="Real-time complexity analysis with interactive graphs."
              icon={BarChart2}
              gradient="bg-blue-500"
              isDark={isDark}
            >
              <div className="chart-bars" style={{ borderColor: theme.borderColor }}>
                {[40, 70, 45, 90, 65, 80].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="chart-bar"
                    style={{ background: theme.chartBarBg, borderTop: `2px solid ${theme.chartBarBorder}` }}
                  />
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card 
              title="Side-by-Side Compare" 
              subtitle="Run two algorithms simultaneously to see differences."
              icon={Layers}
              gradient="bg-purple-500"
              isDark={isDark}
            >
              <div className="code-blocks">
                <div className="code-block emerald" style={theme.codeBlock}>
                  <span style={{color: '#34d399'}}>{"quickSort() { ... }"}</span>
                </div>
                <div className="code-block blue" style={theme.codeBlock}>
                  <span style={{color: '#60a5fa'}}>{"mergeSort() { ... }"}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card 
              title="SVG 60fps Motion" 
              subtitle="Smooth, hardware-accelerated SVG animations."
              icon={Activity}
              gradient="bg-emerald-500"
              isDark={isDark}
            >
              <div className="animation-bars">
                {[20, 50, 80, 40].map((h, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [20, 50, 80, 40] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="anim-bar"
                    style={{ 
                      height: h,
                      background: theme.animBarBg,
                      border: `1px solid ${theme.animBarBorder}`
                    }}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        </main>

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Section 1: By Design Approach */}
        <CategorySection
          title="By Design Approach"
          icon={GitBranch}
          description="Explore algorithms categorized by their fundamental design paradigm. Each approach represents a unique strategy for solving computational problems."
          categories={designApproachCategories}
          theme={theme}
          onAlgorithmClick={handleAlgorithmClick}
        />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Section 2: By Type of Operation */}
        <CategorySection
          title="By Type of Operation"
          icon={Layers2}
          description="Browse algorithms based on the type of operation they perform. From sorting to string manipulation, find the right tool for your needs."
          categories={operationTypeCategories}
          theme={theme}
          onAlgorithmClick={handleAlgorithmClick}
        />

        {/* Footer */}
        <footer style={{ borderColor: theme.borderColor }}>
          <div className="footer-stats">
            <span className="footer-stat">
              <CheckCircle style={{color: '#10b981'}} /> 30+ Algorithms
            </span>
            <span className="footer-stat">
              <CheckCircle style={{color: '#10b981'}} /> 100% Coverage
            </span>
          </div>
          <div className="footer-built">
            Built with <Code style={{width: 12, height: 12}}/> React • Framer Motion • CSS
          </div>
        </footer>
      </div>
    </>
  );
};

// Dark Theme
const darkTheme = {
  background: '#0a0f1e',
  textPrimary: '#e2e8f0',
  textSecondary: '#94a3b8',
  accentColor: '#10b981',
  subtitle: { color: '#94a3b8' },
  glassCard: {
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  iconContainer: {
    padding: '8px',
    borderRadius: '8px',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'white',
  },
  cardSubtitle: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    marginBottom: '16px',
  },
  themeToggle: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid #334155',
  },
  startButton: {
    background: '#10b981',
    color: '#0f172a',
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
  },
  borderColor: '#1e293b',
  chartBarBg: 'rgba(59, 130, 246, 0.2)',
  chartBarBorder: '#60a5fa',
  animBarBg: 'linear-gradient(180deg, #10b981, #059669)',
  animBarBorder: '#34d399',
  codeBlock: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid #334155',
  },
  cardBackground: 'rgba(15, 23, 42, 0.6)',
  cardBorder: 'rgba(255, 255, 255, 0.1)',
};

// Light Theme
const lightTheme = {
  background: '#ffffff',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  accentColor: '#10b981',
  subtitle: { color: '#475569' },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  iconContainer: {
    padding: '8px',
    borderRadius: '8px',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#0f172a',
  },
  cardSubtitle: {
    color: '#475569',
    fontSize: '0.875rem',
    marginBottom: '16px',
  },
  themeToggle: {
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid #e2e8f0',
  },
  startButton: {
    background: '#10b981',
    color: '#0f172a',
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
  },
  borderColor: '#e2e8f0',
  chartBarBg: 'rgba(59, 130, 246, 0.3)',
  chartBarBorder: '#3b82f6',
  animBarBg: 'linear-gradient(180deg, #10b981, #059669)',
  animBarBorder: '#34d399',
  codeBlock: {
    background: 'rgba(241, 245, 249, 0.8)',
    border: '1px solid #e2e8f0',
  },
  cardBackground: 'rgba(255, 255, 255, 0.8)',
  cardBorder: 'rgba(0, 0, 0, 0.1)',
};

export default DSADashboard;
