import request from '@/axios'
import type { 
  scoreQuestion, InterviewQuestionDetail, CreateCommentRequest, InterviewSituationResponse, 
   CommentRequest, InterviewSummaryRequest, InterviewSummaryResponse,InterviewSituationRequest
   } from './types'

/** 为面试题评分 */
export function scoreQuestionApi(data: scoreQuestion): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/evaluate/score/mark', data })
}

/** 查询面试试卷详情 */
export function getInterviewQuestionApi(interviewId: string): Promise<IResponse<InterviewQuestionDetail>> {
  return request.get({ url: `/api/v1/evaluate/score/detail/${interviewId}` })
}

/** 创建一条面试评论 */
export function createInterviewCommentApi(data: CreateCommentRequest): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/evaluate/comment/create', data })
}

/** 更新一条面试评论 */
export function updataInterviewCommentApi(data: CommentRequest): Promise<IResponse<undefined>> {
  return request.get({ url: '/api/v1/evaluate/comment/create', data })
}

/** 删除一条面试评论 */
export function deleteInterviewCommentApi(commentId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/evaluate/comment/remove/${commentId}`})
}

/** 获取一场面试的所有评论 */
export function getInterviewCommentApi(interviewId: string): Promise<IResponse<undefined>> {
  return request.get({ url: `/api/v1/evaluate/comment/list/${interviewId}`})
}

/** 为一场面试进行总结 */
export function summarizeInterviewApi(data: InterviewSummaryRequest): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/evaluate/summary/mark', data})
}

/** 查询面试总结 */
export function getInterviewSummaryApi(interviewId: string): Promise<IResponse<InterviewSummaryResponse>> {
  return request.post({ url: `/api/v1/evaluate/summary/query/${interviewId}`})
}

/** 查看总的面试情况 */
export function getInterviewSituationApi(data: InterviewSituationRequest): Promise<IResponse<InterviewSituationResponse>> {
  return request.post({ url: '/api/v1/evaluate/summary/rank', data})
}
