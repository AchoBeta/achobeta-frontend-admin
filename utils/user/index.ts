import { DEFAULT_AVATAR } from "~/constants/global"

export const useAvatar = (avatar: string | null |
   undefined | number
) => {
  if(avatar) {
    if(typeof avatar === 'string' && avatar.startsWith('http')) {
      return avatar
    } else if (typeof avatar === 'number') {
      console.log('code')
    }
  }

  return DEFAULT_AVATAR
}