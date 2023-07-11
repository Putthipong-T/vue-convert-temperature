/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')


module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"),
    plugin(function({ addVariant  }){
      addVariant ('children','&>*')
    }
    ),
    require('tailwindcss'),
    require('autoprefixer'),],
}
