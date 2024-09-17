import { TRANSFORM_REQUEST_DATA } from '@/constants'
import { objToFormData } from '@/utils'
import qs from 'qs'
import { useRouter } from 'vue-router'
import type { AxiosResponse, InternalAxiosRequestConfig } from './types'

const router = useRouter()

function defaultRequestInterceptors(config: InternalAxiosRequestConfig) {
  if (
    config.method === 'post'
    && config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  )
    config.data = qs.stringify(config.data)
  else if (
    TRANSFORM_REQUEST_DATA
    && config.method === 'post'
    && config.headers['Content-Type'] === 'multipart/form-data'
    && !(config.data instanceof FormData)
  )
    config.data = objToFormData(config.data)

  if (config.method === 'get' && config.params) {
    let url = config.url as string
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null)
        url += `${key}=${encodeURIComponent(config.params[key])}&`
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
    config.url = url
  }
  return config
}

function defaultResponseInterceptors(response: AxiosResponse) {
  if (response?.config?.responseType === 'blob') {
    // 如果是文件流，直接过
    return response
  }
  console.log(response.data)
  // if (response.data.code === responseCode.UNVALID_TOKEN.value) {
  //   // token失效，跳转登录页面
  //   message.error('登录过期，请重新登录')
  //   router.push('/login')
  // }
  return response.data
}

export { defaultRequestInterceptors, defaultResponseInterceptors }

