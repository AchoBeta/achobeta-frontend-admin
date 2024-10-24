import request from '@/axios'

/** 将长链转换为短链 */
export function loginWithPasswordApi(url: string): Promise<IResponse<string>> {
  return request.post({ url: '/api/v1/shortlink/trans', params: { url } })
}
