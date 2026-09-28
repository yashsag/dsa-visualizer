/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom colors for glassmorphism
        glass: {
          bg: "rgba(15, 23, 42, 0.6)",
          border: "rgba(255, 255, 255, 0.1)",
        },
        emerald: {
          glow: "rgba(16, 185, 129, 0.4)",
          "glow-hover": "rgba(16, 185, 129, 0.6)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-text": "linear-gradient(90deg, #34d399, #3b82f6)",
      },
    },
  },
  plugins: [],
};
