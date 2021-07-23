module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
        student: "15rem 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
