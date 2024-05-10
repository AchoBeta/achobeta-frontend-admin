/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  theme: {
    extend: {
      colors:{
        'bg-base':'#fbfbfb',
        'active-base':'#ff6175',
        'gray-base':'#717579'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
