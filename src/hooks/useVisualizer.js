import { useEffect, useMemo, useRef, useState } from "react";

const MIN_VALUE = 12;
const MAX_VALUE = 34; // ponytail: random init/"Generate Data" stays under 50; custom input is untouched

const generateRandomArray = (size) =>
  Array.from(
    { length: size },
    () =>
      Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE,
  );

const parseUserInput = (rawValue, algorithm, fallbackSize) => {
  const tokens = rawValue
    .split(/[,\s]+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) {
    return [];
  }

  const values = tokens.map((token) => Number(token));
  if (!values.every((value) => Number.isFinite(value))) {
    return null;
  }

  if (algorithm?.id === "n-queens") {
    const boardSize = Math.max(4, Math.round(values[0] || fallbackSize || 4));
    return [boardSize];
  }

  if (algorithm?.id === "knapsack-01") {
    const itemCount = Math.max(1, Math.round(values[0] || 4));
    const capacity = Math.max(1, Math.round(values[1] || 7));
    return [itemCount, capacity];
  }

  return values;
};

const getSafeStep = (steps, index, fallbackArray) =>
  steps[index] || {
    array: fallbackArray,
    explanation: "Ready to visualize.",
    activeLines: [],
    indices: [],
    sortedIndices: [],
    pivotIndex: null,
    stats: { comparisons: 0, swaps: 0, iterations: 0 },
  };

const clampIndex = (index, max) =>
  Math.min(Math.max(index, 0), Math.max(max, 0));

const useVisualizer = (algorithm) => {
  const [inputSize, setInputSize] = useState(24);
  const [speed, setSpeed] = useState(420);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [array, setArray] = useState(() => generateRandomArray(24));
  const [isPlaying, setIsPlaying] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const timeoutRef = useRef(null);
  const pendingCustomArrayRef = useRef(null);

  const currentStep = useMemo(
    () => getSafeStep(steps, currentStepIndex, array),
    [array, currentStepIndex, steps],
  );

  const loadAlgorithmState = (targetAlgorithm, size, nextArray = generateRandomArray(size)) => {
    const nextSteps = targetAlgorithm.generateSteps(nextArray);
    setIsPlaying(false);
    setArray(nextSteps[0]?.array || nextArray);
    setSteps(nextSteps);
    setCurrentStepIndex(0);
  };

  useEffect(() => {
    const nextArray = pendingCustomArrayRef.current;
    pendingCustomArrayRef.current = null;
    loadAlgorithmState(algorithm, inputSize, nextArray || generateRandomArray(inputSize));
  }, [algorithm, inputSize]);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return undefined;
    }

    timeoutRef.current = setTimeout(() => {
      setCurrentStepIndex((index) => {
        const nextIndex = clampIndex(index + 1, steps.length - 1);
        setArray(steps[nextIndex]?.array || array);
        return nextIndex;
      });
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [array, currentStepIndex, isPlaying, speed, steps]);

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    setArray(currentStep.array);
  }, [currentStep]);

  const handleGenerateData = () => {
    const parsedValues = parseUserInput(customInput, algorithm, inputSize);

    if (parsedValues === null) {
      window.alert("Please enter valid numeric input.");
      return;
    }

    if (!parsedValues.length) {
      loadAlgorithmState(algorithm, inputSize);
      return;
    }

    pendingCustomArrayRef.current = parsedValues;
    setInputSize(parsedValues.length);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setArray(steps[0]?.array || array);
  };

  const handleTogglePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      handleReset();
    }
    setIsPlaying((value) => !value);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentStepIndex((index) => {
      const nextIndex = clampIndex(index + 1, steps.length - 1);
      setArray(steps[nextIndex]?.array || array);
      return nextIndex;
    });
  };

  const handleInputSizeChange = (size) => {
    setInputSize(size);
  };

  return {
    array,
    customInput,
    currentStep,
    currentStepIndex,
    inputSize,
    isPlaying,
    speed,
    stats: currentStep.stats,
    totalSteps: steps.length,
    generateData: handleGenerateData,
    reset: handleReset,
    setSpeed,
    setCustomInput,
    setInputSize: handleInputSizeChange,
    stepForward: handleStepForward,
    togglePlayPause: handleTogglePlayPause,
  };
};

export default useVisualizer;
