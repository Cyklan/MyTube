/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["components/**/*.tsx", "pages/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyUi: {
    themes: ["halloween", "dracula", "autumn"],
    darkTheme: "dracula"
  }
}
