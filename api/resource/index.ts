import request from '@/axios'
import type { } from './types'

export function uploadOneApi(file: File): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/resource/upload/one', data: file })
}

export function uploadListApi(file: File[]): Promise<IResponse<number[]>> {
  return request.post({ url: '/api/v1/resource/upload/list', data: file })
}

export function uploadImageApi(file: File): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/resource/upload/image', data: file })
}

export function uploadVideoApi(file: File): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/resource/upload/video', data: file })
}

export function getPreviewApi(code: string): Promise<IResponse<string>> {
  return request.get({ url: `/api/v1/resource/preview/${code}` })
}

export function getDownloadApi(code: string): Promise<IResponse<string>> {
  return request.get({ url: `/api/v1/resource/download/${code}` })
}