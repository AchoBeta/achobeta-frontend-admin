import request from '@/axios'
import type { ActivityJoinSituation, UserParticipationVO, InterviewApm, UpdateInterviewApm, InterviewRes, interviewDetail } from './types'

/** 查看参与某活动的所有用户参与和预约情况 */
export function getAllUserSituations(actId: string): Promise<IResponse<ActivityJoinSituation>> {
  return request.get({ url: `/api/v1/schedule/situations/${actId}` })
}

/** 查看具体一个用户的活动参与与预约详情 */
export function getUserSituationsApi(participationId: string): Promise<IResponse<UserParticipationVO>> {
  return request.get({ url: `/api/v1/schedule/situation/detail/${participationId}` })
}

/** 创建一次面试预约 */
export function createInterviewApmApi(data: InterviewApm): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/schedule/create', data })
}

/** 删除一次面试预约 */
export function deleteInterviewApmApi(scheduleId: string): Promise<IResponse<{scheduleId: string}>> {
  return request.get({ url: `/api/v1/schedule/remove/${scheduleId}` })
}

/** 修改面试预约的时间 */
export function updateInterviewApmApi(data: UpdateInterviewApm): Promise<IResponse<undefined>> {
  return request.post({ url: `/api/v1/schedule/update`, data })
}

/** 参与一个已创建的预约 */
export function attendCreatedApmApi(scheduleId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/schedule/attend/${scheduleId}` })
}

/** 退出一场面试预约 */
export function exitCreatedApmApi(scheduleId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/schedule/exit/${scheduleId}` })
}

/** 获取当前管理员相关的面试预约 */
export function getCurInterviewApmApi(actId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/schedule/list/${actId}` })
}

/** 查看面试预约详情 */
export function getInterviewApmDetailApi(scheduleId: string): Promise<IResponse<interviewDetail>> {
  return request.get({ url: `/api/v1/schedule/detail/${scheduleId}` })
}

/** 查看所有面试预约 */
export function getAllAppointments(condition?: { batchId?: number, actId?: number}): Promise<IResponse<InterviewRes[]>> {
  return request.post({ url: `/api/v1/schedule/list/all`, data: condition })
}