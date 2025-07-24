module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "md3-primary-container": "var(--md3-primary-container)",
        "md3-on-primary-container": "var(--md3-on-primary-container)",
        "md3-on-surface": "var(--md3-on-surface)",
        "md3-on-surface-variant": "var(--md3-on-surface-variant)",
        "md3-outline-variant": "var(--md3-outline-variant)",
      },
    },
  },
  plugins: [],
};
