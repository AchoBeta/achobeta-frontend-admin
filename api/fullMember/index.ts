import type { AdminMemInfoData } from './types'
import request from '@/axios'

/** 获得当前管理员的正式成员信息 */
export function getCurMemInfoApi(): Promise<IResponse<AdminMemInfoData>> {
  return request.post({ url: '/api/v1/member/info' })
}

/** 查看指定管理员的正式成员信息 */
export function getAdminMemInfoApi(managerId: string): Promise<IResponse<AdminMemInfoData>> {
  return request.post({ url: `/api/v1/member/info/${managerId}` })
}

/** 查看正式成员列表 */
export function getMemInfoListApi(): Promise<IResponse<AdminMemInfoData[]>> {
  return request.get({ url: '/api/v1/member/list' })
}
