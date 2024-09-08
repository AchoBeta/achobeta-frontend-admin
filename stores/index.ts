// 统一管理导出
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useCounterStore } from './modules/counterStore'
import { useMenuStore } from './modules/menuStore'
import { useUserStore } from './modules/userStore'
// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(piniaPluginPersistedstate)

export default pinia
// 模块统一导出
export { useCounterStore, useMenuStore, useUserStore }

