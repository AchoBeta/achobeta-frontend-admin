import request from '@/axios'

export function uploadSingleApi(file: File): Promise<IResponse<number>> {
  const formData = new FormData()
  formData.append('file', file as any);

  return request.post({ url: '/api/v1/resource/upload/one', headers: { "Content-Type": 'multipart/form-data'},  data: formData })
}

export function uploadListApi(files: File[]): Promise<IResponse<number[]>> {
  const formData = new FormData()
  files.forEach( file => {
    formData.append('file', file as any);
  })

  return request.post({ url: '/api/v1/resource/upload/list', data: files })
}

export function uploadImageApi(file: File): Promise<IResponse<number>> {
  const formData = new FormData()
  formData.append('file', file as any);

  return request.post({ url: '/api/v1/resource/upload/image', headers: { "Content-Type": 'multipart/form-data'},  data: formData })
}

export function uploadVideoApi(file: File): Promise<IResponse<number>> {
  const formData = new FormData()
  formData.append('file', file as any);

  return request.post({ url: '/api/v1/resource/upload/video', headers: { "Content-Type": 'multipart/form-data'},  data: formData })
}

export function getPreviewApi(code: string): Promise<IResponse<string>> {
  return request.get({ url: `/api/v1/resource/preview/${code}`, responseType: 'arraybuffer' })
}

export function getDownloadApi(code: string): Promise<IResponse<string>> {
  return request.get({ url: `/api/v1/resource/download/${code}` })
}