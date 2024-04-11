const { poluiPlugin } = require('pol-ui')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}', 'node_modules/pol-ui/lib/**/*.js'],
  theme: {
    extend: {}
  },
  darkMode: 'media',
  plugins: [
    require('@tailwindcss/typography'),
    poluiPlugin({
      /*
[
  {
    "hex": "#ffffec",
    "rgb": "rgb(255, 255, 236)",
    "token": "primary-50"
  },
  {
    "hex": "#ffffc5",
    "rgb": "rgb(255, 255, 197)",
    "token": "primary-100"
  },
  {
    "hex": "#ffffa9",
    "rgb": "rgb(255, 255, 169)",
    "token": "primary-200"
  },
  {
    "hex": "#ffff82",
    "rgb": "rgb(255, 255, 130)",
    "token": "primary-300"
  },
  {
    "hex": "#ffff69",
    "rgb": "rgb(255, 255, 105)",
    "token": "primary-400"
  },
  {
    "hex": "#ffff44",
    "rgb": "rgb(255, 255, 68)",
    "token": "primary-500"
  },
  {
    "hex": "#e8e83e",
    "rgb": "rgb(232, 232, 62)",
    "token": "primary-600"
  },
  {
    "hex": "#b5b530",
    "rgb": "rgb(181, 181, 48)",
    "token": "primary-700"
  },
  {
    "hex": "#8c8c25",
    "rgb": "rgb(140, 140, 37)",
    "token": "primary-800"
  },
  {
    "hex": "#6b6b1d",
    "rgb": "rgb(107, 107, 29)",
    "token": "primary-900"
  }
]
      */
      colors: {
        primary: {
          50: '#ffffec',
          100: '#ffffc5',
          200: '#ffffa9',
          300: '#ffff82',
          400: '#ffff69',
          500: '#ffff44',
          600: '#e8e83e',
          700: '#b5b530',
          800: '#8c8c25',
          900: '#6b6b1d'
        }
      }
    })
  ]
}
