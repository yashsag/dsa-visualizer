import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("algo-visualizer-theme");
    return savedTheme || "dark";
  });

  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-high-contrast", highContrast);
    localStorage.setItem("algo-visualizer-theme", theme);
  }, [theme, highContrast]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    highContrast,
    toggleHighContrast,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
