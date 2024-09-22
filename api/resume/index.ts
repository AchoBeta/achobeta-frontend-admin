import request from '@/axios'
import type { ResumeRequest, ResumeResponse } from './types'

/** 查询简历（管理员） */
export function getResumeAdminApi(data: ResumeRequest): Promise<IResponse<ResumeResponse>> {
  return request.post({ url: '/api/v1/resume/query', data })
}

/** 查询简历（用户） */
export function getResumeUserApi(batchId: string): Promise<IResponse<ResumeResponse>> {
  return request.post({ url: `/api/v1/resume/query/${batchId}` })
}


