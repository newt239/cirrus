/** @type {import('tailwindcss').Config} */

const { DEFAULT_THEME } = require('@mantine/core')
const mantineColorsForTailwind = {}
for (const [name, colors] of Object.entries(DEFAULT_THEME.colors)) {
  mantineColorsForTailwind[name] = colors.reduce((acc, cur, i) => {
    return { ...acc, [i]: cur }
  }, {})
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mantine: mantineColorsForTailwind
      },
    },
  },
  plugins: [
  ],
}

