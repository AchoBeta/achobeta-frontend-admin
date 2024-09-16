import request from '@/axios'
import type { ResumeStatu, ResumeEvent, eventData } from './types'

/** 获取简历状态列表 */
export function getResumeStatusApi(): Promise<IResponse<ResumeStatu[]>> {
  return request.post({ url: '/api/v1/resumestate/list/status' })
}

/** 获取简历事件列表 */
export function getResumeEventsApi(): Promise<IResponse<ResumeEvent[]>> {
  return request.post({ url: '/api/v1/resumestate/list/status' })
}

/** 执行简历事件 */
export function executeResumeEventApi(resumeId: string, event: number, data: eventData): Promise<IResponse<ResumeEvent[]>> {
  return request.post({ url: `/api/v1/resumestate/execute/${resumeId}`, params:{event}, data })
}

