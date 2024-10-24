import type { Template, getUserCondition, messageFormat, userResponse } from './types'
import request from '@/axios'
/** 获取可发送消息的用户列表 */
export function selectSentableUserApi(data: getUserCondition): Promise<IResponse<userResponse>> {
  return request.post({ url: '/api/v1/message/stu/query', data })
}

/** 获取用户系统信息 */
export function getUserSysMessageApi(): Promise<IResponse<userResponse>> {
  return request.get({ url: '/api/v1/message/info/query' })
}

/** 发送面试信息 */
export function sendEmailsMessageApi(condition: messageFormat): Promise<IResponse<userResponse>> {
  const formData = new FormData()
  formData.append('content', condition.content)
  formData.append('batchId', condition.batchId)
  formData.append('tittle', condition.tittle)
  formData.append('userIds', condition.userIds as any)
  const file = condition.attachments
  if (file) {
    for (let i = 0; i < file.length; i++)
      formData.append('attachment', file[i])
  }

  return request.post({ url: '/api/v1/message/email/mass', headers: { 'Content-Type': 'multipart/form-data' }, data: formData })
}

/** 查询信息模板 */
export function getMessageTemplateApi(): Promise<IResponse<Template[]>> {
  return request.get({ url: '/api/v1/template/query' })
}

/** 新增信息模板 */
export function addMessageTemplateApi(data: { templateTitle: string, templateContent: string }): Promise<IResponse<undefined>> {
  return request.post({ url: '/api/v1/template/add', data })
}

/** 删除一个信息模板 */
export function removeMessageTemplateApi(templateId: string): Promise<IResponse<undefined>> {
  return request.delete({ url: `/api/v1/template/del/${templateId}` })
}

/** 更新一个信息模板 */
export function updateMessageTemplateApi(data: Template): Promise<IResponse<undefined>> {
  return request.put({ url: '/api/v1/template/update', data })
}
