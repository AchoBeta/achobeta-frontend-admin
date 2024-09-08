import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserLoginType, UserType } from '~/api/login/types'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<UserType | undefined>(undefined)
    const tokenKey = ref('Authorization')
    const token = ref('')
    const rememberMe = ref(true)
    const loginInfo = ref<UserLoginType | undefined>({ password: undefined, username: undefined })

    const setTokenKey = (newTokenKey: string) => {
      tokenKey.value = newTokenKey
    }
    const setToken = (newToken: string) => {
      console.log('token更新')
      token.value = newToken
    }
    const setUserInfo = (newUserInfo?: UserType) => {
      userInfo.value = newUserInfo
    }
    const logoutConfirm = () => {
      console.log('登出')
    }
    const reset = () => {
      setToken('')
      setUserInfo(undefined)
      // router.replace('/login') 
    }
    const logout = () => {
        reset()
    }
    const setRememberMe = (newRememberMe: boolean) => {
      rememberMe.value = newRememberMe
    }
    const setLoginInfo = (newLoginInfo?: UserLoginType) => {
      loginInfo.value = newLoginInfo
    }

    return {
        userInfo, 
        tokenKey, 
        token, 
        rememberMe,
        loginInfo,

        setTokenKey, 
        setToken, 
        setUserInfo, 
        logoutConfirm, 
        reset, 
        logout, 
        setRememberMe, 
        setLoginInfo
    }
},
{
  persist: {
    key: 'user',
    storage: persistedState.localStorage,
    paths: ['token', 'userInfo', 'rememberMe', 'loginInfo']
  }
})