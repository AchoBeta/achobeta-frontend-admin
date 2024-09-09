import { CONTENT_TYPE } from '@/constants'
import { useUserStore } from '~/stores/modules/userStore'
import service from './service'

function request(option: AxiosConfig) {
  const { url, method, params, data, headers, responseType } = option

  const userStore = useUserStore()
  return service.request({
    url,
    method,
    params,
    data,
    responseType,
    headers: {
      'Content-Type': CONTENT_TYPE,
      [userStore.getTokenKey ?? 'Authorization']: userStore.token ?? '',
      ...headers,
    },
  })
}

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
