import request from '@/axios'
import type { createPaper, EBankResData } from './types'

/** 创建一个试卷 */
export function createPaperApi(data: createPaper): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/library/paper/create', data })
}

/** 更新一张试卷 */
export function updatePaperApi(paperId:number, data: createPaper): Promise<IResponse<createPaper>> {
  return request.post({ url: `/api/v1/qpaper/update/${paperId}`, data })
}

/** 删除一张试卷 */
export function deletePaperApi(paperId: string): Promise<IResponse<{paperId: string}>> {
  return request.get({ url: `/api/v1/qpaper/remove/${paperId}` })
}

/** 获取一个试卷库的所有试卷 */
export function getBankExamPaperApi(libId: string): Promise<IResponse<EBankResData[]>> {
  return request.get({ url: `/api/v1/qpaper/list/${libId}` })
}

/** 获取所有试卷 */
export function getAllExamPaperApi(): Promise<IResponse<EBankResData[]>> {
  return request.get({ url: '/api/v1/qpaper/list/all' })
}
  