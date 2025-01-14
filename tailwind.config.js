/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './public/**/*.html',
  ],
  theme: {
    extend: {},
    screens: {
      sm: '640px',   // Define breakpoints para tamaños de pantalla
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  presets: [],
  plugins: [
    require('flowbite/plugin')({
      datatables: true,
    }),
  ],
}

