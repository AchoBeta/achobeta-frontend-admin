import request from '@/axios'
import type { PaperListResData } from './types'

export function getPaeperBankList(): Promise<IResponse<PaperListResData[]>> {
  return request.get({ url: '/api/v1/library/paper/list' })
}