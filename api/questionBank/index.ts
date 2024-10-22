import request from '@/axios'
import type { renameBank, QBankResData } from './types'

/** 创建一个题库 */
export function createQuestionBankApi(libType: string): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/library/question/create', params:{libType} })
}

/** 题库重命名 */
export function renameQuestionBankApi(data: renameBank): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/library/question/rename', data })
}

/** 查看所有题库 */
export function getQuestionBankListApi(): Promise<IResponse<QBankResData[]>> {
  return request.get({ url: '/api/v1/library/question/list' })
}

/** 批量插入题目 */
export function insertQuestionsApi(data: { libId: number, questionIds: number[]}): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/library/question/reference', data })
}