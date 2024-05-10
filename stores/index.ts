// 统一管理导出
import { createPinia } from 'pinia'
//@ts-ignore
import persist from 'pinia-plugin-persistedstate'
import { useMenuStore } from './modules/menuStore'
import { useCounterStore } from './modules/counterStore'

// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

export default pinia
// 模块统一导出
export { useMenuStore, useCounterStore } 
