import type { CreateQuestion, QuestionDetail, SelectQuestionCondition, selectResponse } from './types'
import request from '@/axios'

/** 创建一道题 */
export function createQuestionApi(data: CreateQuestion): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/question/add', data })
}

/** 更新一道题 */
export function updateQuestionApi(questionId: number, data: CreateQuestion): Promise<IResponse<CreateQuestion>> {
  return request.post({ url: `/api/v1/question/update/${questionId}`, data })
}

/** 删除一道题 */
export function deleteQuestionApi(questionId: number): Promise<IResponse<{ paperId: number }>> {
  return request.get({ url: `/api/v1/question/remove/${questionId}` })
}

/** 获取一道题的详细信息 */
export function getQuestionDetailApi(questionId: number): Promise<IResponse<QuestionDetail>> {
  return request.get({ url: `/api/v1/question/detail/${questionId}` })
}

/** 获取题目 */
export function selectQuestionApi(data: SelectQuestionCondition): Promise<IResponse<selectResponse>> {
  return request.post({ url: '/api/v1/question/query', data })
}
