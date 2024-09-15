import request from '@/axios'
import type { addQuestion, ExamPageDetail } from './types'

/** 为试卷添加若干道题 */
export function addQuesionApi(data: addQuestion): Promise<IResponse<addQuestion>> {
  return request.post({ url: '/api/v1/pqlink/add', data })
}

/** 为试卷移除若干道题 */
export function removeQuesionApi(data: addQuestion): Promise<IResponse<addQuestion>> {
  return request.post({ url: '/api/v1/pqlink/add', data })
}

/** 获取一张试卷的详细信息 */
export function getExamPaperDetailApi(paperId: string): Promise<IResponse<ExamPageDetail>> {
  return request.post({ url: `/api/v1/pqlink/detail/${paperId}` })
}
