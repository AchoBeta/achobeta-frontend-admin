import { DEFAULT_AVATAR } from '~/constants/global'
import { getPreviewApi } from '~/api/resource'

interface Response {
  avatar: Ref<string>
  loading: Ref<boolean>
  error: Ref<any>
}

export const useAvatar = (avatar: null | number): Response => {
  const avatarUrl = ref<string>('')
  const loading = ref<boolean>(false)
  const error = ref<any>(null)

  const loadAvatar = async () => {
    loading.value = true
    try {
      if (avatar) {
        const res = await getPreviewApi(String(avatar))
        const src = `data:image/jpeg;base64,${btoa(new Uint8Array(res as any).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`
        avatarUrl.value = src
      } else {
        avatarUrl.value = DEFAULT_AVATAR
      }
    } catch (err) {
      console.error(err)
      avatarUrl.value = DEFAULT_AVATAR
      error.value = err
    } finally {
      loading.value = false
    }
  }

  loadAvatar() // 调用异步函数

  return {
    avatar: avatarUrl,
    loading,
    error,
  }
}
