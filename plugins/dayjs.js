import dayjs from 'dayjs';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(dayjs);
});
