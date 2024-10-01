import { CONTENT_TYPE } from '@/constants'
import { useUserStore } from '~/stores/modules/userStore'
import service from './service'

// 请求函数
function request(option: AxiosConfig) {
  const { url, method, params, data, headers, responseType } = option

  const userStore = useUserStore()

  // 创建一个基础headers对象，包含默认的'Content-Type'
  const baseHeaders: any = {
    'Content-Type': CONTENT_TYPE,
  };

  // 如果userStore.token不是空字符串或者不是undefined，则添加token请求头
  if (userStore.token !== '' && userStore.token !== undefined) {
    baseHeaders['token'] = userStore.token;
  }

  // 使用展开运算符将传入的headers与基础headers合并
  const finalHeaders = {
    ...baseHeaders,
    ...headers,
  };



  return service.request({
    url,
    method,
    params,
    data,
    responseType,
    headers: finalHeaders,
  })
}

// 提供默认的请求方法
export default {
  get: <T = any>(option: AxiosConfig) => {
    return request({ method: 'get', ...option }) as Promise<IResponse<T>>
  },
  post: <T = any>(option: AxiosConfig) => {
    return request({ method: 'post', ...option }) as Promise<IResponse<T>>
  },
  delete: <T = any>(option: AxiosConfig) => {
    return request({ method: 'delete', ...option }) as Promise<IResponse<T>>
  },
  put: <T = any>(option: AxiosConfig) => {
    return request({ method: 'put', ...option }) as Promise<IResponse<T>>
  },
  cancelRequest: (url: string | string[]) => {
    return service.cancelRequest(url)
  },
  cancelAllRequest: () => {
    return service.cancelAllRequest()
  },
}
