import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light')
  const setTheme = (newTheme: string) => {
    theme.value = newTheme
  }
  return {
    theme,
    setTheme,
  }
}, {
  persist: {
    key: 'theme',
    storage: localStorage,
  },
})
