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

export function sendEmailsMessageApi(condition: messageFormat): Promise<IResponse<userResponse>> {
  const formData = new FormData()
  formData.append('content', condition.content)
  formData.append('batchId', condition.batchId)
  formData.append('tittle', condition.tittle)
  formData.append('userIds', condition.userIds as any)
  const file = condition.attachments
  if (file) {
    for (let i = 0; i < file.length; i++) {
      formData.append('attachment', file[i])
    }
  }

  return request.post({ url: '/api/v1/message/email/mass', headers: { "Content-Type": 'multipart/form-data'}, data: formData })
}