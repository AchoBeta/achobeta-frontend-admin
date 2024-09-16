import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { PasswordParams, UserInfo } from '~/api/user/types'

const router = useRouter()

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<UserInfo | undefined>(undefined)
    const tokenKey = ref('Authorization')
    const token = ref<string | undefined>()
    const rememberMe = ref(true)
    const loginInfo = ref<PasswordParams>({ password: '', username: '' })

    const setTokenKey = (newTokenKey: string) => {
        tokenKey.value = newTokenKey
    }
    const setToken = (newToken: string) => {
        token.value = newToken
    }
    const setUserInfo = (newUserInfo?: UserInfo) => {
        userInfo.value = newUserInfo
    }
    const logoutConfirm = () => {
        console.log('登出')
    }
    const reset = () => {
        setToken('')
        setUserInfo(undefined)
        router.replace('/login') 
    }
    const logout = () => {
        reset()
    }
    const setRememberMe = (newRememberMe: boolean) => {
        rememberMe.value = newRememberMe
    }
    const setLoginInfo = (newLoginInfo: PasswordParams) => {
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