import type { UserType } from './types'
import request from '@/axios'

export function loginApi(data: UserType): Promise<IResponse<UserType>> {
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
