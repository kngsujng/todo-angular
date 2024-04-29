/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  extend: {
    screens: {
      print: { raw: 'print' },
    },
  },
  plugins: [],
}

