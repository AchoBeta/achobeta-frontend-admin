import request from '@/axios'
import type { RecruitActivityRequest, SetActivityPaper, ActivityDetail, ActivityTime, ActivityModal } from './types'

/** 创建一个题库 */
export function createActivityApi(data: RecruitActivityRequest): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/recruit/activity/create', data })
}

/** 开启招新活动 */
export function startActivityApi(actId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/recruit/activity/shift/${actId}`, params: {isRun: true} })
}

/** 关闭招新活动 */
export function endActivityApi(actId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/recruit/activity/shift/${actId}`, params: {isRun: false} })
}
/** 更新招新活动信息 */
export function updateActivityApi(data: RecruitActivityRequest): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/recruit/activity/update', data })
}

/** 设置招新活动的试卷 */
export function setActivityPapaerApi(data: SetActivityPaper): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/recruit/activity/set/paper', data })
}

/** 添加招新活动的可选时间段 */
export function addActivityPeriodApi(data: ActivityTime): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/recruit/activity/period/add', data })
}

/** 删除招新活动的可选时间段 */
export function deleteActivityPeriodApi(periodId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/recruit/activity/period/remove/${periodId}` })
}

/** 获取招新活动信息收集模板 */
export function getActivityDetailApi(actId: string): Promise<IResponse<ActivityModal>> {
  return request.get({ url: `/api/v1/recruit/activity/template/${actId}` })
}

/** 查看某批次招新活动列表 */
export function getActivityApi(batchId: string, isRun?: boolean ): Promise<IResponse<ActivityDetail[]>> {
  return request.get({ url: `/api/v1/recruit/activity/list/manager/${batchId}`, params: {isRun} })
}