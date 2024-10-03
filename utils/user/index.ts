import { DEFAULT_AVATAR } from "~/constants/global"
import  { getPreviewApi } from "~/api/resource"

export const useAvatar = async (avatar: string | null |
   undefined | number
) => {
  try {
    if(avatar) {
      if(typeof avatar === 'string' && avatar.startsWith('http')) {
        return Promise.resolve(avatar)
      } else if (typeof avatar === 'number') {
        const res = await getPreviewApi(String(avatar))
        const src = `data: image/jpeg;base64,${btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
        return Promise.resolve(src) 
      }
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
  return Promise.resolve(DEFAULT_AVATAR) 
}