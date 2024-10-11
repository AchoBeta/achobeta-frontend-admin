import { DEFAULT_AVATAR } from "~/constants/global";
import { getPreviewApi } from "~/api/resource";

type Response = {
  avatar: Ref<string>,
  loading: Ref<boolean>,
  error: Ref<any>,
};

export const useAvatar = (avatar: string | null | undefined | number): Response => {
  const avatarUrl = ref<string>('');
  const loading = ref<boolean>(false);
  const error = ref<any>(null);

  const loadAvatar = async () => {
    loading.value = true;
    try {
      if (avatar) {
        if (typeof avatar === 'string' && avatar.startsWith('http')) {
          avatarUrl.value = avatar;
        } else if (typeof avatar === 'number') {
          const res = await getPreviewApi(String(avatar));
            const src = `data:image/jpeg;base64,${btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
            avatarUrl.value = src;
        }
      } else {
        avatarUrl.value = DEFAULT_AVATAR;
      }
    } catch (err) {
      console.error(err);
      avatarUrl.value = DEFAULT_AVATAR;
      error.value = err;
    } finally {
      loading.value = false;
    }

  };

  loadAvatar(); // 调用异步函数

  return {
    avatar: avatarUrl,
    loading,
    error,
  }
}
