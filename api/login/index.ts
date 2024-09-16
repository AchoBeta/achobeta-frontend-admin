import request from '@/axios'
import type { UserType } from './types'


export function loginApi(data: UserType): Promise<IResponse<{ access_token: string, expires_in: number }>> {
  const payload: any = {
    login_type: 'password',
    password_params: {
      username: data.username,
      password: data.password,
    },
  }

  data = payload
  return request.post({ url: '/api/v1/auth/login', data })
}

export function getuserinfo(): Promise<IResponse<UserType>> {
  return request.get({ url: '/api/v1/user/info' })
}