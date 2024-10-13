import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UserInfo } from '~/types/userInfo'
import { DEFAULT_AVATAR } from '~/constants/global'

const router = useRouter()

interface Logininfo {
  password: string
  username: string
}

const DEFAULT_USERINFO = {
  username: '未登录',
  avatar: DEFAULT_AVATAR,
  email: '暂未设置',
  phoneNumber: '暂未设置',
  userType: 2,
  nickname: '未登录'
}

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<UserInfo>(DEFAULT_USERINFO)
    const tokenKey = ref<string>('Authorization')
    const token = ref<string>('')
    const rememberMe = ref<boolean>(true)
    const loginInfo = ref<Logininfo>({ password: '', username: '' })

    const setTokenKey = (newTokenKey: string) => {
        tokenKey.value = newTokenKey
    }
    const setToken = (newToken: string) => {
        token.value = newToken
    }
    const setUserInfo = (newUserInfo: UserInfo) => {
        userInfo.value = newUserInfo
    }
    const reset = (router:any) => {
        setToken('')
        setUserInfo(DEFAULT_USERINFO)
        router?.replace('/login') 
    }
    const logout = () => {
        reset(router)
    }
    const setRememberMe = (newRememberMe: boolean) => {
        rememberMe.value = newRememberMe
    }
    const setLoginInfo = (newLoginInfo: Logininfo) => {
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
            // @ts-ignore
            paths: ['token', 'userInfo', 'rememberMe', 'loginInfo']
        }
    })