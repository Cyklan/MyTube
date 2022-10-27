/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["components/**/*.tsx", "pages/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyUi: {
    themes: ["halloween", "dracula", "autumn"],
    darkTheme: "dracula"
  }
}
