import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AlgoSelector from "../components/visualizer/AlgoSelector";
import CodePanel from "../components/visualizer/CodePanel";
import ControlPanel from "../components/visualizer/ControlPanel";
import ExplanationPanel from "../components/visualizer/ExplanationPanel";
import StatsPanel from "../components/visualizer/StatsPanel";
import VisualizerCanvas from "../components/visualizer/VisualizerCanvas";
import "../components/visualizer/visualizer.css";
import { categoryConfig, getCategoryBySlug } from "../config/categoryConfig";
import useVisualizer from "../hooks/useVisualizer";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const category = getCategoryBySlug(categorySlug);

  const initialAlgorithmId =
    location.state?.algorithmId &&
    category?.algorithms.some(
      (algorithm) => algorithm.id === location.state.algorithmId,
    )
      ? location.state.algorithmId
      : category?.defaultAlgorithmId;

  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState(initialAlgorithmId);

  useEffect(() => {
    setSelectedAlgorithmId(initialAlgorithmId);
  }, [initialAlgorithmId]);

  const selectedAlgorithm = useMemo(
    () =>
      category?.algorithms.find((algorithm) => algorithm.id === selectedAlgorithmId) ||
      category?.algorithms[0],
    [category, selectedAlgorithmId],
  );

  const fallbackAlgorithm = categoryConfig[0].algorithms[0];
  const visualizer = useVisualizer(selectedAlgorithm || fallbackAlgorithm);

  if (!category || !selectedAlgorithm) {
    return (
      <div className="not-found">
        <div className="not-found-card">
          <h1>Category not found</h1>
          <p>The requested visualizer category does not exist in the new routing system.</p>
          <button className="back-button" type="button" onClick={() => navigate("/")}>
            <ArrowLeft size={16} />
            Back to homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <motion.div
        className="category-shell"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <header className="category-header">
          <div className="category-title-block">
            <p className="panel-kicker">Category Visualizer</p>
            <h1>{category.title}</h1>
            <p>{category.description}</p>
          </div>

          <div className="header-actions">
            <AlgoSelector
              algorithms={category.algorithms}
              selectedAlgorithmId={selectedAlgorithm.id}
              onSelect={setSelectedAlgorithmId}
            />
            <button className="back-button" type="button" onClick={() => navigate("/")}>
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        </header>

        <div className="visualizer-layout">
          <div className="visualizer-main">
            <VisualizerCanvas
              algorithm={selectedAlgorithm}
              accentColor={category.accent}
              algorithmName={selectedAlgorithm.name}
              array={visualizer.array}
              category={category.slug}
              currentStep={visualizer.currentStep}
              data={visualizer.array}
            />

            <ControlPanel
              customInput={visualizer.customInput}
              currentStepIndex={visualizer.currentStepIndex}
              inputSize={visualizer.inputSize}
              isPlaying={visualizer.isPlaying}
              onCustomInputChange={visualizer.setCustomInput}
              onGenerateData={visualizer.generateData}
              onInputSizeChange={visualizer.setInputSize}
              onReset={visualizer.reset}
              onSpeedChange={visualizer.setSpeed}
              onStepForward={visualizer.stepForward}
              onTogglePlayPause={visualizer.togglePlayPause}
              speed={visualizer.speed}
              totalSteps={visualizer.totalSteps}
            />
          </div>

          <div className="visualizer-side">
            <ExplanationPanel
              currentStepIndex={visualizer.currentStepIndex}
              explanation={visualizer.currentStep.explanation}
              totalSteps={visualizer.totalSteps}
            />
            <CodePanel
              activeLines={visualizer.currentStep.activeLines || []}
              code={selectedAlgorithm.code}
              language={selectedAlgorithm.codeLanguage}
            />
            <StatsPanel
              spaceComplexity={selectedAlgorithm.spaceComplexity}
              stats={visualizer.stats}
              timeComplexity={selectedAlgorithm.timeComplexity}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryPage;
