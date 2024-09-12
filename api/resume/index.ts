import request from '@/axios'
import type { ResumeRequest, ResumeResponst, batchlistResponse } from './types'


export function getresumeApi(data: ResumeRequest): Promise<IResponse<ResumeResponst>> {
    return request.post({ url: '/api/v1/resume/query', data })
}

export function batchlistApi(): Promise<IResponse<batchlistResponse>> {
    return request.get({ url: '/api/v1/recruit/batch/list/manager' })
}