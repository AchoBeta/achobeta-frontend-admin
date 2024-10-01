import request from '@/axios'
import type { getUserCondition, userResponse, messageFormat } from './types'

export function selectSentableUserApi(data:getUserCondition): Promise<IResponse<userResponse>> {
  return request.post({ url: '/api/v1/message/stu/query', data })
}

export function getUserSysMessageApi(): Promise<IResponse<userResponse>> {
  return request.get({ url: '/api/v1/message/info/query' })
}

export function sendEmailMessageApi(condition: messageFormat, file?: File[]): Promise<IResponse<userResponse>> {
  const formData = new FormData()
  if (file) {
    for (let i = 0; i < file.length; i++) {
      formData.append('attachment', file[i])
    }
  }

  return request.post({ url: '/api/v1/message/email/send', headers: { "Content-Type": 'multipart/form-data'}, params: condition, data: formData })
}