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
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes').light,
          'bg-custom': '#f5222d',
        },
        dark: {
          ...require('daisyui/src/theming/themes').dark,
          'bg-custom': '#ffec3d',
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        'bg-base': '#fbfbfb',
        'active-base': '#ff6175',
        'gray-base': '#717579',
        'detail-base': '#f5f5f5',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  darkMode: ['class', '[data-theme="dark"]'], // 将talwind和daisyui结合起来
}
