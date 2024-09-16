import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UserInfo } from '~/types/userInfo'
interface Logininfo {
  password: string
  username: string
}

const router = useRouter()
const DEFAULT_USERINFO = {
  username: '未登录',
  avatar: 'https://zhidao-prod.oss-cn-shenzhen.aliyuncs.com/UPTOCLOUD/16835112339414645/202409/微信图片_20240512114952_UYdTo1.jpg',
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
    const logoutConfirm = () => {
        console.log('登出')
    }
    const reset = () => {
        setToken('')
        setUserInfo(DEFAULT_USERINFO)
        router.replace('/login') 
    }
    const logout = () => {
        reset()
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
            // @ts-ignore
            paths: ['token', 'userInfo', 'rememberMe', 'loginInfo']
        }
    })