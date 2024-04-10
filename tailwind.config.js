const { poluiPlugin } = require('pol-ui')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}', 'node_modules/pol-ui/lib/**/*.js'],
  theme: {
    extend: {}
  },
  darkMode: 'media',
  plugins: [require('@tailwindcss/typography'), poluiPlugin({})]
}
