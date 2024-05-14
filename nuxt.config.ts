// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'achobeta招新管理系统',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'AchoBeta Team 招新管理系统' },
      ],
      // 引入font awesome 图标库 https://fontawesome.com/
      script: [
        'https://kit.fontawesome.com/c07f3e1d31.js',
      ],
    },
  },
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-svgo',
  ],
  svgo: {
    global: false,
    autoImportPath: '@/assets/svg',
    componentPrefix: 'Icon',
    customComponent: 'Icon',
    // * 这里已经指定了 svg 的目录，会在编译时自动引入，只需要在模板中使用 <Icon-xxx /> 即可
    // * 多层级目录的话 也是同理，多一个 - 去分割即可
  },
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
