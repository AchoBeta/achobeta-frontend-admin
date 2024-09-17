import request from '@/axios'
import type { CreateRecruitBatch, batchlistResponse, UpdateRecruitBatch, RecruitBatchDetail, ResumeData } from './types'

/** 创建招新批次 */
export function createRecruitBatchApi(data: CreateRecruitBatch): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/recruit/batch/create', data })
}

/** 开启招新批次 */
export function startRecruitBatchApi(batchId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/recruit/batch/shift/${batchId}`, params: { isRun: true } })
}

/** 关闭招新批次 */
export function endRecruitBatchApi(batchId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/recruit/batch/shift/${batchId}`, params: { isRun: false } })
}

/** 更新招新批次信息 */
export function updateRecruitBatchApi(data: UpdateRecruitBatch): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/recruit/batch/update', data })
}

/** 查看招新批次列表（管理员） */
export function getBatchListAdminApi(isRun?: boolean): Promise<IResponse<batchlistResponse>> {
  return request.get({ url: '/api/v1/recruit/batch/list/manager', params: isRun })
}

/** 查看招新批次列表（用户） */
export function getBatchListUserApi(): Promise<IResponse<batchlistResponse>> {
  return request.get({ url: '/api/v1/recruit/batch/list/user' })
}

/** 查看招新批次详情 */
export function getBatchListDetailApi(batchId: string): Promise<IResponse<RecruitBatchDetail>> {
  return request.get({ url: `/api/v1/recruit/batch/detail/${batchId}` })
}

/** 获取参与本批次的学生简要简历列表（管理员) */
export function getBatchStudentResumeApi(batchId: number): Promise<IResponse<ResumeData[]>> {
  return request.get({ url: `/api/v1/recruit/batch/participants/${batchId}` })
}