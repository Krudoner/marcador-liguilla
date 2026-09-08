/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        pitch:  { 900:'#0F3D2E', 700:'#155E3C', 500:'#2C7A4B', 100:'#DCEFE3' },
        chalk:  { 50:'#F7F6F0', 100:'#EFEDE3' },
        gold:   { 400:'#E3B23C', 500:'#C99223' },
        card:   { 600:'#B4172B' },
        ink:    { 900:'#15201B' }
      },
      fontFamily: {
        score: ['Oswald', 'sans-serif'],
        body:  ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

