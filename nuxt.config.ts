// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'achobeta招新管理系统',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '实验室招新管理系统' },
      ],
      // 引入font awesome 图标库 https://fontawesome.com/
      script: [
        { src: 'https://kit.fontawesome.com/c07f3e1d31.js', crossorigin: 'anonymous' },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@pinia-plugin-persistedstate/nuxt', '@ant-design-vue/nuxt',
  ],
  css: ['@/assets/css/tailwind.css', '@/assets/css/global.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    server: {
      proxy: {
        '/api': {
<<<<<<< HEAD
          target: 'http://qycizn.natappfree.cc',
=======
          target: 'http://sizesd.natappfree.cc',
>>>>>>> 829c5d73158f447a3e9e31d4bd13408c69c20b50
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '/api'),
        },
      },
    },
  },
  typescript: {
    typeCheck: false,
  }
})
