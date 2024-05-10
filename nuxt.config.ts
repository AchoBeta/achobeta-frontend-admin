// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      title: 'achoBeta招新管理系统',
      meta:[
        {name:'description', content:'招新管理系统'}
      ],
      script:[
        {src:'https://kit.fontawesome.com/c07f3e1d31.js'}
      ]
    }
  },
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  css:['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})