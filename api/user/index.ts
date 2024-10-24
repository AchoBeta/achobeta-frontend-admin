import type { LWEmail, LWPassword, LoginResponse, PasswordParams, UserInfo, UserTypeRes } from './types'
import request from '@/axios'

/** 密码登录 */
export function loginWithPasswordApi(data: LWPassword): Promise<IResponse<LoginResponse>> {
  return request.post({ url: '/api/v1/auth/login', data })
}

/** 邮箱登录 */
export function loginWithEmailApi(data: LWEmail): Promise<IResponse<any>> {
  return request.post({ url: '/api/v1/auth/login', data })
}

/** 发送验证码 */
export function sendVerifyCodeApi(email: string): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/email/code', params: email })
}

/** 用户注册（发布版无法访问） */
export function registerApi(data: PasswordParams): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/auth/register', data })
}

/** 获取当前账户信息 */
export function getUserInfoApi(): Promise<IResponse<UserInfo>> {
  return request.get({ url: '/api/v1/user/info' })
}

/** 修改当前账户信息 */
export function updateUserInfoApi(avatar: string | null, nickname: string): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/user/update', data: { avatar, nickname } })
}

/** 获取用户类型列表 */
export function getUserTypeApi(): Promise<IResponse<UserTypeRes[]>> {
  return request.get({ url: '/api/v1/user/list/type' })
}
