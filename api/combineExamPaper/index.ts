import type { ExamPageDetail, addQuestion } from './types'
import request from '@/axios'

/** 为试卷添加若干道题 */
export function addQuesionApi(data: addQuestion): Promise<IResponse<addQuestion>> {
  return request.post({ url: '/api/v1/pqlink/add', data })
}

/** 为试卷移除若干道题 */
export function removeQuesionApi(data: addQuestion): Promise<IResponse<addQuestion>> {
  return request.post({ url: '/api/v1/pqlink/remove', data })
}

/** 获取一张试卷的详细信息 */
export function getExamPaperDetailApi(paperId: string): Promise<IResponse<ExamPageDetail>> {
  return request.get({ url: `/api/v1/pqlink/detail/${paperId}` })
}
