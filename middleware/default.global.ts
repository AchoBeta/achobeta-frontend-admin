export default defineNuxtRouteMiddleware((to, from) => {
    // Do something before each route change
    console.log("to" + to.path)
    console.log("from" + from.path)
    console.log('Middleware is running')
})