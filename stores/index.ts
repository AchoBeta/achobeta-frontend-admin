import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useMenuStore } from './modules/menuStore'
import { useUserStore } from './modules/userStore'

const pinia = createPinia()
// 使用持久化存储插件
pinia.use(piniaPluginPersistedstate)

export default pinia
// 模块统一导出
export { useMenuStore, useUserStore }