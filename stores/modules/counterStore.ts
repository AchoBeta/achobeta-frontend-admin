import { defineStore } from 'pinia'


export const useCounterStore = defineStore('count', () => {
  let count = ref(0)
  let count1 = ref(0)

  const increament = () => {
    count.value++
    count1.value++
  }

  return {
    count,
    count1,
    increament
  }
},
  {
    persist: {
      // Key 用于引用 storage 中的数据
      key: 'counter',
      // 默认值 localStorage 
      storage: persistedState.localStorage,
      // 用于指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state。
      paths: ['count'],
    }
  }
)