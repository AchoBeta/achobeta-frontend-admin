import { defineStore } from 'pinia'
import type { UserLoginType, UserType } from '~/api/login/types'
import pinia from '../index'

interface UserState {
    userInfo?: UserType
    tokenKey: string
    token: string
    rememberMe: boolean
    loginInfo?: UserLoginType
}

export const useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            userInfo: undefined,
            tokenKey: 'Authorization',
            token: '',
            // 记住我
            rememberMe: true,
            loginInfo: undefined
        }
    },
    getters: {
        getTokenKey(): string {
            return this.tokenKey
        },
        getToken(): string {
            return this.token
        },
        getUserInfo(): UserType | undefined {
            return this.userInfo
        },
        getRememberMe(): boolean {
            return this.rememberMe
        },
        getLoginInfo(): UserLoginType | undefined {
            return this.loginInfo
        }
    },
    actions: {
        setTokenKey(tokenKey: string) {
            this.tokenKey = tokenKey
        },
        setToken(token: string) {
            this.token = token
        },
        setUserInfo(userInfo?: UserType) {
            this.userInfo = userInfo
        },

        logoutConfirm() {
            console.log('登出')

        },
        reset() {

            this.setToken('')
            this.setUserInfo(undefined)
            // router.replace('/login')
        },
        logout() {
            this.reset()
        },
        setRememberMe(rememberMe: boolean) {
            this.rememberMe = rememberMe
        },
        setLoginInfo(loginInfo: UserLoginType | undefined) {
            this.loginInfo = loginInfo
        }
    },
    persist: true
})

export const useUserStoreWithOut = () => {
    return useUserStore(pinia)
}
