import type { GetInterview, Interview, InterviewDetail, InterviewPaper, InterviewResponse, UpdataInterview } from './types'
import request from '@/axios'

/** 创建一场面试 */
export function createInterviewApi(data: Interview): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/interview/create', data })
}

/** 更新面试信息 */
export function updateInterviewApi(data: UpdataInterview): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/interview/update', data })
}

/** 获取面试状态列表 */
export function getInterviewStatusApi(): Promise<IResponse<undefined>> {
  return request.get({ url: '/api/v1/interview/list/status' })
}

/** 执行面试事件 */
export function executeInterviewEventApi(event: number, interviewId: string): Promise<IResponse<number>> {
  return request.post({ url: `/api/v1/interview/execute/${interviewId}`, params: { event } })
}

/** 为面试设置试卷 */
export function setInterviewPaperApi(data: InterviewPaper): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/interview/set/paper', data })
}

/** 获取所有的面试 */
export function getAllInterviewApi(data?: GetInterview): Promise<IResponse<InterviewResponse[]>> {
  return request.post({ url: '/api/v1/interview/list/manager/all', data })
}

/** 获取与自己相关的面试 */
export function getMyInterviewApi(data?: GetInterview): Promise<IResponse<InterviewResponse[]>> {
  return request.post({ url: '/api/v1/interview/list/manager/own', data })
}

/** 获取面试详情 */
export function getInterviewDetailApi(interviewId: string): Promise<IResponse<InterviewDetail>> {
  return request.get({ url: `/api/v1/interview/detail/${interviewId}` })
}
