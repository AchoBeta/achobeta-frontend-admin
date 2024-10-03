import request from '@/axios'

export function uploadOneApi(file: File): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/resource/upload/one', data: file })
}

export function uploadListApi(file: File[]): Promise<IResponse<number[]>> {
  return request.post({ url: '/api/v1/resource/upload/list', data: file })
}

export function uploadImageApi(fileList: File[]): Promise<IResponse<number>> {
  const formData = new FormData()
  fileList.forEach((file) => {
    formData.append('files[]', file as any);
  })

  return request.post({ url: '/api/v1/resource/upload/image', data: fileList })
}

export function uploadVideoApi(file: File): Promise<IResponse<number>> {
  return request.post({ url: '/api/v1/resource/upload/video', data: file })
}

export function getPreviewApi(code: string): Promise<IResponse<string>> {
  return request.get({ url: `/api/v1/resource/preview/${code}`, responseType: 'arraybuffer' })
}

export function getDownloadApi(code: string): Promise<IResponse<string>> {
  return request.get({ url: `/api/v1/resource/download/${code}` })
}