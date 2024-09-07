// import { useUserStore, useUserStoreWithOut } from '../stores/modules/userStore'
// const userStore = useUserStore()
import { ref } from 'vue'




export default defineNuxtRouteMiddleware((to, from) => {
    // Do something before each route change

    const userStore = useUserStore()
    const loginInfo = ref(userStore.getLoginInfo)
    if (loginInfo.value.username != '') {

        if (to.path === '/login') {
            return navigateTo('/')
        }
    } else {
        if (to.path !== '/login') {
            return navigateTo('/login')
        }

    }



})