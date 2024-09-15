import request from '@/axios'
import type { QBankResData, renameBank } from './types'

/** 创建一个试卷库 */
export function createPaeperBankApi(libType: string): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/library/paper/create', params:{libType} })
}

/** 试卷库重命名 */
export function renamePaeperBankApi(data: renameBank): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/library/paper/create', data })
}

/** 查看所有试卷库 */
export function getPaeperBankListApi(): Promise<IResponse<QBankResData[]>> {
  return request.get({ url: '/api/v1/library/paper/list' })
}