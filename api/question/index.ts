import request from '@/axios'
import type { CreateQuestion, QuestionRes, QuestionDetail } from './types'

/** 创建一道题 */
export function createQuestionApi(data: CreateQuestion): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/question/add', data })
}

/** 更新一道题 */
export function updateQuestionApi(questionId: number, data: CreateQuestion): Promise<IResponse<CreateQuestion>> {
  return request.post({ url: `/api/v1/question/update/${questionId}`, data })
}

/** 删除一道题 */
export function deleteQuestionApi(questionId: number): Promise<IResponse<{paperId: number}>> {
  return request.get({ url: `/api/v1/qpaper/remove/${questionId}` })
}

/** 获取一个题库的所有题目 */
export function getBankQuestionsApi(libId: number): Promise<IResponse<QuestionRes[]>> {
  return request.get({ url: `/api/v1/question/list/${libId}` })
}

/** 获取一道题的详细信息 */
export function getQuestionDetailApi(questionId: number): Promise<IResponse<QuestionDetail>> {
  return request.get({ url: `/api/v1/question/detail/${questionId}` })
}

/** 获取所有题目 */
export function getAllQuestionApi(): Promise<IResponse<QuestionRes[]>> {
  return request.get({ url: '/api/v1/question/list/all' })
}
  