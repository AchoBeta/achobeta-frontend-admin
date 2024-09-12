import request from '@/axios'
import type { userInfo } from './types'

export function getUserInfo(): Promise<IResponse<userInfo>> {
  return request.get({ url: '/api/v1/user/info' })
}